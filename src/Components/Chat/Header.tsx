import React from "react";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { useSearchParams } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }: any) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Conversation_Menu = [
  {
    title: "Contact info",
  },
  {
    title: "Mute notifications",
  },
  {
    title: "Clear messages",
  },
  {
    title: "Delete chat",
  },
];

const ChatHeader = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const { currentChat } = useSelector((state: any) => state.chat);
  const { user } = useSelector((state: any) => state.auth);

  const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
    React.useState(null);
  const openConversationMenu = Boolean(conversationMenuAnchorEl);
  const handleClickConversationMenu = (event: any) => {
    setConversationMenuAnchorEl(event.currentTarget);
  };
  const handleCloseConversationMenu = () => {
    setConversationMenuAnchorEl(null);
  };
  const [receiver, setReceiver] = React.useState<{
    id: any;
    name: string;
    email: string;
    pic: any;
  }>({ id: "", email: "", name: "", pic: "" });

  React.useEffect(() => {
    const getUserDetail = () => {
      if (currentChat) {
        const rece = currentChat.participants.filter((u: any) => {
          if (u._id !== user?._id) return u;
        });
        setReceiver(() => ({
          email: rece[0].email,
          id: rece[0]._id,
          name: rece[0].username,
          pic: rece[0].pic,
        }));
      }
    };
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      p={1}
      width={"100%"}
      sx={
        {
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        } as any
      }
    >
      <Stack
        alignItems={"center"}
        direction={"row"}
        sx={{ width: "100%", height: "80%" }}
        justifyContent="space-between"
      >
        <Stack
          onClick={() => {
            searchParams.set("open", true as any);
            setSearchParams(searchParams);
          }}
          spacing={2}
          direction="row"
        >
          <Box>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
            >
              <Avatar alt={receiver.name} src={receiver.pic} />
            </StyledBadge>
          </Box>
          <Stack spacing={0.1}>
            <Typography variant="subtitle2">{receiver.name}</Typography>
            <Typography variant="caption" style={{fontWeight:500}}>{receiver.email}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems="center" spacing={1}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          {!isMobile && (
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
          )}

          <Divider orientation="vertical" flexItem />
          <IconButton
            id="conversation-positioned-button"
            aria-controls={
              openConversationMenu ? "conversation-positioned-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={openConversationMenu ? "true" : undefined}
            onClick={handleClickConversationMenu}
          >
            <CaretDown />
          </IconButton>
          <Menu
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            TransitionComponent={Fade}
            id="conversation-positioned-menu"
            aria-labelledby="conversation-positioned-button"
            anchorEl={conversationMenuAnchorEl}
            open={openConversationMenu}
            onClose={handleCloseConversationMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box p={0.1}>
              <Stack spacing={0.8}>
                {Conversation_Menu.map((el) => (
                  <MenuItem onClick={handleCloseConversationMenu}>
                    <Stack
                      sx={{ minWidth: 80 }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="space-between"
                    >
                      <span style={{ fontSize: 13, fontWeight: 500 }}>
                        {el.title}
                      </span>
                    </Stack>{" "}
                  </MenuItem>
                ))}
              </Stack>
            </Box>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatHeader;
