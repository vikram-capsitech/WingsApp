import {
  ChatCircleDots,
  Gear,
  GearSix,
  SignOut,
  User,
  Users,
} from "phosphor-react";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "Settings",
    icon: <Gear />,
  },
  {
    title: "Sign Out",
    icon: <SignOut />,
  },
];

const Message_options = [
  // {
  //   title: "Reply",
  // },
  // {
  //   title: "React to message",
  // },
  // {
  //   title: "Forward message",
  // },
  // {
  //   title: "Star message",
  // },
  // {
  //   title: "Report",
  // },
  {
    title: "Delete Message",
    key: "Delete",
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />,
  },
  {
    index: 1,
    icon: <Users />,
  },
  // {
  //   index: 2,
  //   icon: <Bug />,
  // },
];

const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
  },
];

export { Profile_Menu, Nav_Setting, Nav_Buttons, Message_options };
