import { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { Autocomplete, TextField, Chip, Avatar } from "@mui/material";
import { GET_STUDENT_BY_CLASS_ID } from "../../../Schema/Class";
import { AuthContext } from "../../../Context/AuthContext";
export default function MultilineSelectStudent({ value, onChange, classId }) {
  const { language, t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);
  const { refetch } = useQuery(GET_STUDENT_BY_CLASS_ID, {
    variables: {
      keyword: "",
      classId: classId,
    },
    onCompleted: ({ getStudentByclassId }) => {
      const data = getStudentByclassId?.map((e) => ({
        id: e?._id,
        title: `${e?.familyName} ${e?.studentName}`,
        avatar: e?.profile || "",
      }));
      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.error("Error fetching students:", error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Autocomplete
      multiple
      size="small"
      // limitTags={6}
      id="multiple-student-select"
      options={selectOptions}
      value={value}
      onChange={onChange}
      getOptionLabel={(option) => option.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option.id}
            avatar={<Avatar alt={option.title} src={option.avatar} />}
            variant="outlined"
            color="warning"
            label={option.title}
            {...getTagProps({ index })}
            sx={{ borderRadius: 1 }}
          />
        ))
      }
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.id}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <Avatar
            src={option.avatar}
            alt={option.title}
            sx={{ width: 24, height: 24 }}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} placeholder={t("thead_select")} />
      )}
    />
  );
}
