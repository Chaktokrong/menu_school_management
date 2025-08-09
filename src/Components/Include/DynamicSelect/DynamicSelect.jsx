import { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../../Context/AuthContext";
import {
  SELECT_USER,
  SELECT_CLASS,
  SELECT_COURSE,
  SELECT_SUBJECT,
  SELECT_STUDENT,
  SELECT_EXAM_TYPE,
  SELECT_GROUP_FEE,
  SELECT_CLASS_BY_STUDENT_ID,
  SELECT_SUBJECT_BY_CLASS_ID,
  SELECT_ENROLLMENT_BY_STUDENT,
} from "../../../Schema/SelectSchema";
import { GET_STUDENT_BY_CLASS_ID } from "../../../Schema/Class";

import ShiftForm from "../../Shift/ShiftForm";
import TeacherForm from "../../Teacher/TeacherForm";
import CourseForm from "../../Course/CourseForm";
import StudentForm from "../../Student/StudentForm";
import SubjectForm from "../../Subject/SubjectForm";
import ExamTypeForm from "../../StudyClass/Exam/ExamTypeForm/ExamTypeForm";
import { GET_SHIFT } from "../../../Schema/Shift";

import {
  Stack,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

export const SelectUser = ({
  className,
  onChange,
  buttonAdd = true,
  value = { id: "", title: "" },
  role,
}) => {
  // Change Language
  const { language, t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);
  const { refetch } = useQuery(SELECT_USER, {
    variables: {
      role: role,
    },
    onCompleted: ({ selectUser }) => {
      const data = selectUser?.map((e) => ({
        id: e?._id,
        title: e?.familyName + " " + e?.userName,
      }));
      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography className={t("class-name-field-title")}>
          {role === "Teacher" ? t("thead_teacher") : t("thead_user")}
        </Typography>
        {buttonAdd && (
          <IconButton sx={{ padding: 0.5 }} onClick={handleOpen}>
            <AddBoxOutlinedIcon
              fontSize="small"
              sx={{ color: "green", cursor: "pointer" }}
            />
          </IconButton>
        )}
        {open && (
          <TeacherForm
            hideBackdrop={true}
            open={open}
            setRefetch={refetch}
            dialogTitle={"Create"}
            handleClose={handleClose}
          />
        )}
      </Stack>
      <Autocomplete
        fullWidth
        size="small"
        options={selectOptions}
        className={className}
        value={value}
        onChange={(event, val) => onChange(val)}
        getOptionLabel={(option) => option.title || ""}
        isOptionEqualToValue={(option, value) => true}
        renderInput={(params) => (
          <TextField {...params} placeholder={t("thead_select")} />
        )}
      />
    </Stack>
  );
};

export const SelectCourse = ({
  className,
  onChange,
  buttonAdd = true,
  value = { id: "", title: "" },
}) => {
  // Change Language
  const { language, t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);
  const { refetch } = useQuery(SELECT_COURSE, {
    onCompleted: ({ selectCourse }) => {
      // console.log("selectCourse:", selectCourse);
      const data = selectCourse?.map((e) => ({
        id: e?._id,
        title: language === "en" ? e?.enName : e?.khName,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography className={t("class-name-field-title")}>
          {t("thead_course")}
        </Typography>
        {buttonAdd && (
          <IconButton sx={{ padding: 0.5 }} onClick={handleOpen}>
            <AddBoxOutlinedIcon
              fontSize="small"
              sx={{ color: "green", cursor: "pointer" }}
            />
          </IconButton>
        )}
        {open && (
          <CourseForm
            hideBackdrop={true}
            open={open}
            setRefetch={refetch}
            dialogTitle={"Create"}
            handleClose={handleClose}
          />
        )}
      </Stack>
      <Autocomplete
        fullWidth
        size="small"
        options={selectOptions}
        className={className}
        value={value}
        onChange={(event, val) => onChange(val)}
        getOptionLabel={(option) => option.title || ""}
        isOptionEqualToValue={(option, value) => true}
        renderInput={(params) => (
          <TextField {...params} placeholder={t("thead_select")} />
        )}
      />
    </Stack>
  );
};

export const SelectShift = ({
  className,
  onChange,
  value = { id: "", title: "" },
  buttonAdd = true,
}) => {
  // Change Language
  const { language, t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);
  const { refetch } = useQuery(GET_SHIFT, {
    onCompleted: ({ getShifts }) => {
      // console.log("getShifts:", getShifts);
      const data = getShifts?.map((e) => ({
        id: e?._id,
        title: language === "en" ? e?.enName : e?.khName,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography className={t("class-name-field-title")}>
          {t("thead_shift")}
        </Typography>
        {buttonAdd && (
          <IconButton sx={{ padding: 0.5 }} onClick={handleOpen}>
            <AddBoxOutlinedIcon
              fontSize="small"
              sx={{ color: "green", cursor: "pointer" }}
            />
          </IconButton>
        )}
        {open && (
          <ShiftForm
            hideBackdrop={true}
            open={open}
            setRefetch={refetch}
            dialogTitle={"Create"}
            handleClose={handleClose}
          />
        )}
      </Stack>

      <Autocomplete
        fullWidth
        size="small"
        options={selectOptions}
        className={className}
        value={value}
        onChange={(event, val) => onChange(val)}
        getOptionLabel={(option) => option.title || ""}
        isOptionEqualToValue={(option, value) => true}
        renderInput={(params) => (
          <TextField {...params} placeholder={t("thead_select")} />
        )}
      />
    </Stack>
  );
};

export const SelectClass = ({
  className,
  onChange,
  disabled,
  value = { id: "", title: "" },
}) => {
  // Change Language
  const { language, t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);
  const { refetch } = useQuery(SELECT_CLASS, {
    onCompleted: ({ selectClass }) => {
      const data = selectClass?.map((e) => ({
        id: e?._id,
        title:
          language === "en"
            ? e?.courseId?.enName + " " + e?.className
            : e?.courseId?.enName + " " + e?.className,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      disabled={disabled}
      size="small"
      options={selectOptions}
      className={className}
      value={value}
      onChange={(event, val) => onChange(val)}
      getOptionLabel={(option) => option.title || ""}
      isOptionEqualToValue={(option, value) => true}
      renderInput={(params) => (
        <TextField {...params} placeholder={t("thead_select")} />
      )}
    />
  );
};

export const SelectClassByStudentId = ({
  className,
  onChange,
  studentId,
  value = { id: "", title: "" },
}) => {
  // Change Language
  const { language, t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);
  const { refetch } = useQuery(SELECT_CLASS_BY_STUDENT_ID, {
    variables: {
      studentId,
    },
    onCompleted: ({ getClassByStudentId }) => {
      const data = getClassByStudentId?.map((e) => ({
        id: e?._id,
        title:
          language === "en"
            ? e?.courseId?.enName + " " + e?.className
            : e?.courseId?.enName + " " + e?.className,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      size="small"
      options={selectOptions}
      className={className}
      value={value}
      onChange={(event, val) => onChange(val)}
      getOptionLabel={(option) => option.title || ""}
      isOptionEqualToValue={(option, value) => true}
      renderInput={(params) => (
        <TextField {...params} placeholder={t("thead_select")} />
      )}
    />
  );
};

export const SelectSubject = ({
  className,
  onChange,
  error,
  dataOptions,
  buttonAdd = true,
  value = { id: "", title: "" },
}) => {
  // Change Language
  const { language, t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);
  const { refetch } = useQuery(SELECT_SUBJECT, {
    onCompleted: ({ selectSubject }) => {
      const data = selectSubject?.map((e) => ({
        id: e?._id,
        title: language === "en" ? e?.enName : e?.khName,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        {buttonAdd && (
          <Typography className={t("class-name-field-title")}>
            {t("thead_subject")}
          </Typography>
        )}
        {buttonAdd && (
          <IconButton sx={{ padding: 0.5 }} onClick={handleOpen}>
            <AddBoxOutlinedIcon
              fontSize="small"
              sx={{ color: "green", cursor: "pointer" }}
            />
          </IconButton>
        )}
        {open && (
          <SubjectForm
            open={open}
            hideBackdrop={true}
            setRefetch={refetch}
            dialogTitle={"Create"}
            handleClose={handleClose}
          />
        )}
      </Stack>

      <Autocomplete
        fullWidth
        size="small"
        options={selectOptions.filter(
          (e) => !dataOptions?.map((e) => e?.subjectId?.id)?.includes(e?.id)
        )}
        className={className}
        value={value}
        onChange={(event, val) => onChange(val)}
        getOptionLabel={(option) => option.title || ""}
        isOptionEqualToValue={(option, value) => true}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={t("thead_select")}
            error={error}
          />
        )}
      />
    </Stack>
  );
};

export const SelectSubjectByClassId = ({
  className,
  onChange,
  error,
  classId,
  dataOptions,
  value = { id: "", title: "" },
  disabled,
}) => {
  // Change Language
  const { language, t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);

  const { refetch } = useQuery(SELECT_SUBJECT_BY_CLASS_ID, {
    variables: {
      classId: classId,
    },
    onCompleted: ({ selectSubjectByClassId }) => {
      const data = selectSubjectByClassId?.map((e) => ({
        id: e?._id,
        title: language === "en" ? e?.enName : e?.khName,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  // console.log("selectOptions::", selectOptions)

  useEffect(() => {
    refetch();
  }, [value]);

  return (
    <Autocomplete
      disabled={disabled ? true : false}
      fullWidth
      size="small"
      options={selectOptions.filter(
        (e) => !dataOptions?.map((e) => e?.subjectId?.id)?.includes(e?.id)
      )}
      className={className}
      value={value}
      onChange={(event, val) => onChange(val)}
      getOptionLabel={(option) => option.title || ""}
      isOptionEqualToValue={(option, value) => true}
      renderInput={(params) => (
        <TextField {...params} placeholder={t("thead_select")} error={error} />
      )}
    />
  );
};

export const SelectExamType = ({
  classId,
  className,
  onChange,
  data,
  buttonAdd = true,
  value = { id: "", title: "" },
}) => {
  // Change Language
  const { t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);

  const { refetch } = useQuery(SELECT_EXAM_TYPE, {
    variables: { classId },
    onCompleted: ({ selectExamType }) => {
      const data = selectExamType?.map((e) => ({
        id: e?._id,
        title: e?.examName,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        {buttonAdd && (
          <Typography className={t("class-name-text-field-title")}>
            {t("thead_exam_type")}
          </Typography>
        )}
        {buttonAdd && (
          <IconButton sx={{ padding: 0.5 }} onClick={handleOpen}>
            <AddBoxOutlinedIcon
              fontSize="small"
              sx={{ color: "green", cursor: "pointer" }}
            />
          </IconButton>
        )}
        {open && (
          <ExamTypeForm
            hideBackdrop={true}
            open={open}
            setRefetch={refetch}
            dialogTitle={"Create"}
            handleClose={handleClose}
            classId={classId}
          />
        )}
      </Stack>

      <Autocomplete
        fullWidth
        size="small"
        // options={selectOptions}
        options={selectOptions.filter(
          (e) => !data?.map((e) => e?.subjectId?.id)?.includes(e?.id)
        )}
        className={className}
        value={value}
        onChange={(event, val) => onChange(val)}
        getOptionLabel={(option) => option.title || ""}
        isOptionEqualToValue={(option, value) => true}
        renderInput={(params) => (
          <TextField {...params} placeholder={t("thead_select")} />
        )}
      />
    </Stack>
  );
};

export const SelectExamTypeForForm = ({
  classId,
  className,
  onChange,
  data,
  buttonAdd = true,
  value = { id: "", title: "" },
}) => {
  // Change Language
  const { t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);

  const { refetch } = useQuery(SELECT_EXAM_TYPE, {
    variables: { classId },
    onCompleted: ({ selectExamType }) => {
      const data = selectExamType?.map((e) => ({
        id: e?._id,
        title: e?.examName,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Stack>
      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Typography className={t("class-name-field-title")}>
          {t("thead_exam_type")}
        </Typography>
        <IconButton sx={{ padding: 0.5 }} onClick={handleOpen}>
          <AddBoxOutlinedIcon
            fontSize="small"
            sx={{ color: "green", cursor: "pointer" }}
          />
        </IconButton>
        {open && (
          <ExamTypeForm
            hideBackdrop={true}
            open={open}
            setRefetch={refetch}
            dialogTitle={"Create"}
            handleClose={handleClose}
            classId={classId}
          />
        )}
      </Stack>

      <Autocomplete
        fullWidth
        size="small"
        // options={selectOptions}
        options={selectOptions.filter(
          (e) => !data?.map((e) => e?.subjectId?.id)?.includes(e?.id)
        )}
        className={className}
        value={value}
        onChange={(event, val) => onChange(val)}
        getOptionLabel={(option) => option.title || ""}
        isOptionEqualToValue={(option, value) => true}
        renderInput={(params) => (
          <TextField {...params} placeholder={t("thead_select")} />
        )}
      />
    </Stack>
  );
};

export const SelectStudent = ({
  className,
  onChange,
  data,
  disabled,
  buttonAdd = true,
  value = { id: "", title: "" },
}) => {
  // Change Language
  const { t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);
  //
  const { refetch } = useQuery(SELECT_STUDENT, {
    onCompleted: ({ selectStudent }) => {
      const data = selectStudent?.map((e) => ({
        id: e?._id,
        title: e?.familyName + " " + e?.studentName,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(value); // 👈 prevent undefined)

  return (
    <Stack>
      {buttonAdd && (
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Typography className={t("class-name-field-title")}>
            {t("thead_student")}
          </Typography>

          <IconButton sx={{ padding: 0.5 }} onClick={handleOpen}>
            <AddBoxOutlinedIcon
              fontSize="small"
              sx={{ color: "green", cursor: "pointer" }}
            />
          </IconButton>

          {open && (
            <StudentForm
              hideBackdrop={true}
              open={open}
              setRefetch={refetch}
              dialogTitle={"Create"}
              handleClose={handleClose}
            />
          )}
        </Stack>
      )}

      <Autocomplete
        disabled={disabled}
        fullWidth
        size="small"
        options={selectOptions.filter(
          (e) => !data?.map((d) => d?.studentId?.id)?.includes(e?.id)
        )}
        className={className}
        value={value ?? null} // 👈 prevent undefined
        onChange={(event, val) => onChange(val)}
        getOptionLabel={(option) => option?.title ?? ""} // 👈 prevent error if null
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField {...params} placeholder={t("thead_select")} />
        )}
      />
    </Stack>
  );
};

export const SelectStudentByClass = ({
  className,
  onChange,
  classId,
  value = { id: "", title: "" },
}) => {
  // Change Language
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
        title: e?.familyName + " " + e?.studentName,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      size="small"
      options={selectOptions}
      className={className}
      value={value}
      onChange={(event, val) => onChange(val)}
      getOptionLabel={(option) => option.title || ""}
      isOptionEqualToValue={(option, value) => true}
      renderInput={(params) => (
        <TextField {...params} placeholder={t("thead_select")} />
      )}
    />
  );
};

export const SelectGroupFee = ({
  className,
  onChange,
  error,
  value = { id: "", title: "" },
}) => {
  // Change Language
  const { language, t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);
  const { refetch } = useQuery(SELECT_GROUP_FEE, {
    onCompleted: ({ selectGroupFee }) => {
      const data = selectGroupFee?.map((e) => ({
        id: e?._id,
        title: `${e?.title}: ${e?.price}$`,
        price: e?.price,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      size="small"
      options={selectOptions}
      className={className}
      value={value}
      onChange={(event, val) => onChange(val)}
      getOptionLabel={(option) => option.title || ""}
      isOptionEqualToValue={(option, value) => true}
      renderInput={(params) => (
        <TextField {...params} placeholder={t("thead_select")} error={error} />
      )}
    />
  );
};

export const SelectEnrollmentByStudent = ({
  className,
  onChange,
  studentId,
  value = { id: "", title: "" },
}) => {
  // Change Language
  const { language, t } = useContext(AuthContext);
  const [selectOptions, setSelectOptions] = useState([]);

  const { refetch } = useQuery(SELECT_ENROLLMENT_BY_STUDENT, {
    variables: {
      studentId: studentId || "",
    },
    onCompleted: ({ selectEnrollmentByStudent }) => {
      const data = selectEnrollmentByStudent?.map((e) => ({
        id: e?._id,
        title: `${
          language === "en"
            ? e?.classId?.courseId?.enName
            : e?.classId?.courseId?.khName
        } ${e?.classId?.className}`,
      }));

      setSelectOptions(data || []);
    },
    onError: (error) => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [value]);

  return (
    <Autocomplete
      fullWidth
      size="small"
      options={selectOptions}
      className={className}
      value={value}
      onChange={(event, val) => onChange(val)}
      getOptionLabel={(option) => option.title || ""}
      isOptionEqualToValue={(option, value) => true}
      renderInput={(params) => (
        <TextField {...params} placeholder={t("thead_select")} />
      )}
    />
  );
};
