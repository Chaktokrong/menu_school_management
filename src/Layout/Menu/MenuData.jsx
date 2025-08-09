import { LuSchool } from "react-icons/lu";
import { MdCreditScore } from "react-icons/md";
import SettingsIcon from "@mui/icons-material/Settings";
import { TbUsers } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { PiStudent } from "react-icons/pi";
import { PiListChecks } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";

export function menuDataArray() {
  const menuData = [
    {
      name: "Academic",
      route: "/academic-dasboard",
      icon: <LuSchool className="icon" />,
      subMenuData: [
        {
          subName: "Dashboard",
          isCollapse: false,
          route: "/academic-dasboard",
          icon: <RxDashboard className="icon" />,
        },
        {
          subName: "Students",
          isCollapse: true,
          route: "",
          icon: <RxDashboard className="icon" />,
        },
        {
          subName: "Exams",
          isCollapse: true,
          route: "",
          icon: <RxDashboard className="icon" />,
        },
      ],
    },
    {
      name: "Student Information",
      route: "/student-info-dashboard",
      icon: <TbUsers className="icon" />,
      subMenuData: [
        {
          subName: "Dashboard",
          isCollapse: false,
          route: "/student-info-dashboard",
          icon: <RxDashboard className="icon" />,
        },
        {
          subName: "Student",
          isCollapse: true,
          route: "/student-info-student",
          icon: <RxDashboard className="icon" />,
        },
        {
          subName: "Parents",
          isCollapse: false,
          route: "/student-info-parents",
          icon: <RxDashboard className="icon" />,
        },
      ],
    },
  ];

  return menuData;
}

export function collapseDataArray() {
  const menuCollapseData = [
    {
      name: "Academic",
      subName: "Students",
      collapseData: [
        {
          subName: "Student",
          route: "/academic-student",
          icon: <PiStudent className="icon" />,
        },
        {
          subName: "Check Attendance",
          route: "/academic-section-shift",
          icon: <PiListChecks className="icon" />,
        },
        {
          subName: "Attendance Report",
          route: "/academic-attendance-report",
          icon: <TbReportSearch className="icon" />,
        },
      ],
    },
    {
      name: "Academic",
      subName: "Exams",
      collapseData: [
        {
          subName: "Set Up Exam",
          route: "/academic-setup-exam",
          icon: <PiStudent className="icon" />,
        },
        {
          subName: "Exam Schedule",
          route: "/academic-exam-schedule",
          icon: <PiListChecks className="icon" />,
        },
      ],
    },
    {
      name: "Student Information",
      subName: "Student",
      collapseData: [
        {
          subName: "Student",
          route: "/student-info-student",
          icon: <RxDashboard className="icon" />,
        },
        {
          subName: "Check Attendance",
          route: "/student-info-section-shift",
          icon: <RxDashboard className="icon" />,
        },
      ],
    },
  ];

  return menuCollapseData;
}
