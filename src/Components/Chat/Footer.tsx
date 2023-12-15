import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from "phosphor-react";
import { useTheme, styled } from "@mui/material/styles";
import React from "react";
import { useSearchParams } from "react-router-dom";
import useResponsive from "../../Hooks/useResponsive";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useSelector } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../Animations/Typing.json";

const StyledInput = styled(TextField)(() => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px !important",
    paddingBottom: "12px !important",
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
];

interface ChatInputProps {
  handleSendMsg: any;
  value: any;
  onChange: (e: any, value: any) => void;
  handleFile: (file: any) => void;
  isTyping: boolean;
}

const Footer = ({
  handleSendMsg,
  value,
  onChange,
  handleFile,
  isTyping,
}: ChatInputProps) => {
  const theme = useTheme();
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const [searchParams] = useSearchParams();
  const [openPicker, setOpenPicker] = React.useState(false);
  const [openActions, setOpenActions] = React.useState(false);
  const [name, setName] = React.useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  const hiddenFileInput = React.useRef<any>(null);
  const [attachments, setAttachments] = React.useState<File>();

  const { currentChat } = useSelector((state: any) => state.chat);
  const { user } = useSelector((state: any) => state.auth);

  const handleEmojiClick = (e: any) => {
    let message = msg;
    message += e?.native;
    setMsg(message);
    onChange(e, message);
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (e: any) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg, attachments);
      setMsg("");
    }
  };

  React.useEffect(() => {
    setMsg(value);
  }, [value]);

  React.useEffect(() => {
    const getUserDetail = () => {
      if (currentChat) {
        const rece = currentChat.users.filter((u: any) => {
          if (u._id !== user?._id) return u;
        });
        setName(rece[0].username);
      }
    };
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "transparent !important",
      }}
    >
      <Box
        p={isMobile ? 1 : 2}
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
        {isTyping && (
          <Stack
            style={{
              marginLeft: "0%",
              paddingRight: "0%",
            }}
          >
            <Player
              src={animationData}
              className="player"
              loop
              autoplay
              style={{
                height: "auto",
                width: "100px",
                marginTop: "-48px",
                marginBottom:'-50px',
                marginLeft: "-10px",
              }}
            />
          </Stack>
        )}
        <Stack direction="row" alignItems={"center"} spacing={isMobile ? 1 : 3}>
          <Stack sx={{ width: "100%" }}>
            <Box
              style={{
                zIndex: 10,
                position: "fixed",
                display: openPicker ? "inline" : "none",
                bottom: 81,
                right: isMobile
                  ? 20
                  : searchParams.get("open") === "true"
                  ? 420
                  : 100,
              }}
            >
              <Picker
                theme={theme.palette.mode}
                data={data}
                onEmojiSelect={handleEmojiClick}
              />
            </Box>
            {/* Chat Input */}
            <StyledInput
              fullWidth
              placeholder={`Message ${name}`}
              variant="filled"
              value={msg}
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <Stack sx={{ width: "max-content" }}>
                    <Stack
                      sx={{
                        position: "relative",
                        display: openActions ? "inline-block" : "none",
                      }}
                    >
                      {Actions.map((el) => (
                        <Tooltip placement="right" title={el.title}>
                          <Fab
                            onClick={() => {
                              setOpenActions(!openActions);
                            }}
                            sx={{
                              position: "absolute",
                              top: -el.y,
                              backgroundColor: el.color,
                            }}
                            aria-label="add"
                          >
                            {el.icon}
                          </Fab>
                        </Tooltip>
                      ))}
                    </Stack>

                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          hiddenFileInput.current?.click();
                          // setOpenActions(!openActions);
                        }}
                      >
                        <LinkSimple />
                      </IconButton>
                      <input
                        hidden
                        id="attachments"
                        type="file"
                        value=""
                        multiple
                        max={5}
                        onChange={(e) => {
                          if (e.target.files) {
                            const fileUploaded = e.target.files[0];
                            setAttachments(fileUploaded);
                            handleFile(fileUploaded);
                          }
                        }}
                        ref={hiddenFileInput}
                        style={{ display: "none" }} // Make the file input element invisible
                      />
                    </InputAdornment>
                  </Stack>
                ),
                endAdornment: (
                  <Stack sx={{ position: "relative" }}>
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          setOpenPicker(!openPicker);
                        }}
                      >
                        <Smiley />
                      </IconButton>
                    </InputAdornment>
                  </Stack>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendChat(e);
                  setAttachments(undefined);
                }
              }}
              onChange={(e) => {
                setMsg(e.currentTarget?.value);
                onChange(e, undefined);
              }}
            />
          </Stack>
          <Box
            sx={{
              height: 48,
              width: 48,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{ height: "100%" }}
              alignItems={"center"}
              justifyContent="center"
            >
              <IconButton>
                <PaperPlaneTilt color="#ffffff" />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;
