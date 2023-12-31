import { memo } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

function NoChat({ ...other }) {
  const theme = useTheme();
  const { user } = useSelector((state: any) => state.auth);

  const PRIMARY_MAIN = theme.palette.primary.light;
  const SECONDARY = theme.palette.primary.main;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      viewBox="0 0 500 500"
      enableBackground="new 0 0 100 100"
      fill={SECONDARY}
      {...other}
    >
      <radialGradient
        id="a"
        cx={260.628}
        cy={488.696}
        r={134.706}
        gradientTransform="matrix(1.2522 .2637 -.3164 .4889 83.625 71.56)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#749993",
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#749993",
            stopOpacity: 0,
          }}
        />
      </radialGradient>
      <path
        d="M424.038 414.738C400.501 451.11 305.9 464.69 212.742 445.069c-93.158-19.621-149.597-65.012-126.06-101.384 23.537-36.372 118.137-49.952 211.296-30.332 93.158 19.621 149.597 65.012 126.06 101.385z"
        style={{
          opacity: 0.7,
          fill: "url(#a)",
        }}
      />
      <path
        d="M428.938 364.875v-5.336L218.944 254.618 81.916 323.211v5.331c0 3.845 2.173 7.359 5.612 9.077L291.91 439.736l131.424-65.788a10.147 10.147 0 0 0 5.604-9.073z"
        style={{
          fill: "#ececec",
        }}
      />
      <path
        d="m291.982 429.18 136.895-69.022v4.37c0 3.831-2.158 7.336-5.579 9.061l-131.316 66.209V429.18z"
        style={{
          fill: "#c8c8c8",
        }}
      />
      <path
        d="m292.199 429.18-210.4-105.774v4.362c0 3.836 2.163 7.343 5.59 9.066l204.81 102.964V429.18z"
        style={{
          fill: "#dbdbdb",
        }}
      />
      <path
        d="m402.383 357.145 2.24-1.075-171.238-84.334-118.615 56.908 2.24 1.104 116.375-55.834z"
        style={{
          fill: `${PRIMARY_MAIN}`,
        }}
      />
      <linearGradient
        id="b"
        x1={163.763}
        x2={333.651}
        y1={294.25}
        y2={381.372}
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            // stopColor: "#72ec9c",
            stopColor: `${PRIMARY_MAIN}`,
          }}
        />
        <stop
          offset={0.502}
          style={{
            // stopColor: "#a1ec75",
            stopColor: `${SECONDARY}`,
          }}
        />
      </linearGradient>
      <path
        d="m402.383 357.145-168.998-83.231-116.375 55.834 168.998 83.23z"
        style={{
          fill: "url(#b)",
        }}
      />
      <path
        d="M395.402 366.475a.716.716 0 0 1 .647.015l3.495 1.871c.039.021.055.059.088.086.388-.307.38-.924-.088-1.175l-3.495-1.871a.716.716 0 0 0-.647-.015l-78.767 37.588c-.49.234-.521.876-.117 1.193.042-.033.066-.08.117-.104l78.767-37.588z"
        style={{
          fill: "#707a84",
        }}
      />
      <path
        d="M320.1 406.124a.716.716 0 0 0 .647.015l78.767-37.588c.052-.025.076-.071.118-.104-.033-.026-.048-.065-.088-.086l-3.495-1.871a.716.716 0 0 0-.647-.015l-78.767 37.587c-.052.025-.076.071-.117.104.033.026.048.065.088.086l3.494 1.872z"
        style={{
          fill: "#959ca3",
        }}
      />
      <path
        d="m249.308 414.84-17.965-8.758a1.117 1.117 0 0 1-.627-1.003v-2.482c0-.825.863-1.364 1.605-1.003l17.965 8.758c.383.187.627.576.627 1.003v2.483c0 .823-.864 1.363-1.605 1.002z"
        style={{
          fill: "#848484",
        }}
      />
      <path
        d="m248.593 415.26-17.965-8.758a1.117 1.117 0 0 1-.627-1.003v-2.483c0-.824.863-1.364 1.605-1.003l17.965 8.758c.383.187.627.576.627 1.003v2.483a1.116 1.116 0 0 1-1.605 1.003z"
        style={{
          fill: "#a9a9a9",
        }}
      />
      <path
        d="m226.476 403.847-19.374-9.445a1.203 1.203 0 0 1-.676-1.082v-2.677c0-.889.931-1.471 1.73-1.082l19.374 9.445c.414.202.676.622.676 1.082v2.677c0 .89-.931 1.472-1.73 1.082z"
        style={{
          fill: "#848484",
        }}
      />
      <path
        d="m225.704 404.301-19.374-9.445a1.203 1.203 0 0 1-.676-1.082v-2.677c0-.889.931-1.471 1.73-1.082l19.374 9.445c.414.202.676.621.676 1.082v2.677a1.202 1.202 0 0 1-1.73 1.082z"
        style={{
          fill: "#a9a9a9",
        }}
      />
      <ellipse
        cx={168.577}
        cy={292.954}
        rx={10.618}
        ry={5.105}
        style={{
          fill: "#b9c2c6",
        }}
      />
      <ellipse
        cx={168.577}
        cy={292.954}
        rx={9.173}
        ry={4.41}
        style={{
          fill: "#dfe3e5",
        }}
      />
      <path
        d="m321.447 128.842-10.534-7.81a2.125 2.125 0 0 0-1.264-.418h-55.365a2.123 2.123 0 0 1-2.123-2.123V92.267c0-1.172.95-2.123 2.123-2.123h68.428c1.172 0 2.123.95 2.123 2.123v34.87c-.001 1.744-1.987 2.744-3.388 1.705z"
        style={{
          // fill: "#edffd0",
          fill: `${PRIMARY_MAIN}`,
        }}
      />
      <path
        d="M280.011 106.15a2.611 2.611 0 1 1-5.222 0 2.611 2.611 0 0 1 5.222 0zM291.761 106.15a2.611 2.611 0 1 1-5.222 0 2.611 2.611 0 0 1 5.222 0zM303.511 106.15a2.611 2.611 0 1 1-5.222 0 2.611 2.611 0 0 1 5.222 0z"
        style={{
          fill: "#687472",
        }}
      />
      <radialGradient
        id="c"
        cx={335.833}
        cy={501.661}
        r={61.368}
        gradientTransform="matrix(1 0 0 .3904 0 169.819)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#749993",
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#749993",
            stopOpacity: 0,
          }}
        />
      </radialGradient>
      <ellipse
        cx={335.833}
        cy={365.667}
        rx={61.368}
        ry={23.959}
        style={{
          fill: "url(#c)",
        }}
      />
      <radialGradient
        id="d"
        cx={165.582}
        cy={395.427}
        r={61.368}
        gradientTransform="matrix(1 0 0 .3904 0 169.819)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#749993",
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#749993",
            stopOpacity: 0,
          }}
        />
      </radialGradient>
      <ellipse
        cx={165.582}
        cy={324.193}
        rx={61.368}
        ry={23.959}
        style={{
          opacity: 0.6,
          fill: "url(#d)",
        }}
      />
      <path
        d="m236.68 288.888-83.482 41.051a1.94 1.94 0 0 1-1.727-.008L89.387 298.72c-1.431-.72-1.422-2.766.015-3.473l83.482-41.051a1.94 1.94 0 0 1 1.727.008l62.084 31.212c1.432.718 1.423 2.765-.015 3.472z"
        style={{
          fill: "#cbcac2",
        }}
      />
      <path
        d="M235.161 284.152h2.594v3.076h-2.594zM88.311 293.996h2.594v3.076h-2.594z"
        style={{
          fill: "#c3ca9c",
        }}
      />
      <path
        d="m236.68 285.984-83.482 41.051a1.94 1.94 0 0 1-1.727-.008l-62.084-31.212c-1.431-.72-1.422-2.766.015-3.473l83.482-41.051a1.94 1.94 0 0 1 1.727.008l62.084 31.212c1.432.719 1.423 2.766-.015 3.473z"
        style={{
          // fill: "#f8ffec",
          fill: `${PRIMARY_MAIN}`,
        }}
      />
      <path
        d="m207.328 275.006-38.297 18.604-4.084-1.906 38.297-18.604zM216.403 279.18l-73.963 35.757-4.083-1.906 73.963-35.756zM225.116 283.173l-73.963 35.757-4.084-1.906 73.963-35.756z"
        style={{
          opacity: 0.3,
          fill: "#687472",
        }}
      />
      <text
        style={{
          fill: "#6d6d6d",
          fontFamily: "&quot",
          fontSize: "8.9773px",
        }}
        transform="matrix(-.7214 .3439 -.8838 -.4678 113.907 285.067)"
      >
        {"14:03"}
      </text>
      <path
        d="m400.488 333.175-83.482 41.051a1.94 1.94 0 0 1-1.727-.008l-62.084-31.212c-1.431-.72-1.422-2.766.015-3.473l83.482-41.051a1.94 1.94 0 0 1 1.727.008l62.084 31.212c1.431.719 1.422 2.766-.015 3.473z"
        style={{
          fill: "#c3ca9c",
        }}
      />
      <path
        d="M398.969 328.439h2.594v3.076h-2.594zM252.118 338.283h2.594v3.076h-2.594z"
        style={{
          fill: "#c3ca9c",
        }}
      />
      <path
        d="m400.488 330.271-83.482 41.051a1.94 1.94 0 0 1-1.727-.008l-62.084-31.212c-1.431-.72-1.422-2.766.015-3.473l83.482-41.051a1.94 1.94 0 0 1 1.727.008l62.084 31.212c1.431.719 1.422 2.766-.015 3.473z"
        style={{
          // fill: "#edffd0",
          fill: `${PRIMARY_MAIN}`,
        }}
      />
      <path
        d="m343.91 304.591-73.963 35.756-4.084-1.906 73.963-35.756zM352.985 308.766l-73.963 35.756-4.083-1.906 73.962-35.756zM361.697 312.759l-73.963 35.756-4.083-1.906 73.963-35.756zM331.568 335.084l-35.847 17.243-4.084-1.906 35.847-17.243z"
        style={{
          opacity: 0.3,
          fill: "#687472",
        }}
      />
      <text
        style={{
          fill: "#6d6d6d",
          fontFamily: "&quot",
          fontSize: "8.9773px",
        }}
        transform="matrix(.7214 -.3439 .8838 .4678 377.811 334.89)"
      >
        {"14:01"}
      </text>
      <defs>
        <path
          id="e"
          d="m400.488 330.271-83.482 41.051a1.94 1.94 0 0 1-1.727-.008l-62.084-31.212c-1.431-.72-1.422-2.766.015-3.473l83.482-41.051a1.94 1.94 0 0 1 1.727.008l62.084 31.212c1.431.719 1.422 2.766-.015 3.473z"
        />
      </defs>
      <clipPath id="f">
        <use
          xlinkHref="#e"
          style={{
            overflow: "visible",
          }}
        />
      </clipPath>
      <ellipse
        cx={355.98}
        cy={303.593}
        rx={61.368}
        ry={23.959}
        style={{
          opacity: 0.4,
          clipPath: "url(#f)",
          fill: "url(#SVGID_00000031206890759464416360000011336615275237677231_)",
        }}
      />
      <path
        d="m366.907 262.79-83.568 40.878a1.94 1.94 0 0 1-1.727-.011L253.19 289.42c-1.43-.723-1.417-2.769.023-3.473l83.568-40.877a1.94 1.94 0 0 1 1.727.011l28.422 14.237c1.43.722 1.416 2.768-.023 3.472z"
        style={{
          fill: "#c3ca9c",
        }}
      />
      <path
        d="M365.395 258.054h2.594v3.076h-2.594z"
        style={{
          fill: "#c3ca9c",
        }}
        transform="translate(.541 -.763)"
      />
      <path
        d="M252.121 284.696h2.594v3.076h-2.594z"
        style={{
          fill: "#c3ca9c",
        }}
        transform="translate(.596 -.527)"
      />
      <path
        d="m366.913 259.886-83.568 40.877a1.94 1.94 0 0 1-1.727-.011l-28.422-14.237c-1.43-.723-1.417-2.769.023-3.473l83.568-40.877a1.94 1.94 0 0 1 1.727.011l28.422 14.237c1.43.723 1.416 2.769-.023 3.473z"
        style={{
          // fill: "#edffd0",
          fill: `${PRIMARY_MAIN}`,
        }}
      />
      <path
        d="m343.986 251.193-74.037 35.602-4.08-1.914 74.037-35.603zM313.448 272.91l-35.882 17.168-4.08-1.914 35.883-17.169z"
        style={{
          opacity: 0.3,
          fill: "#687472",
        }}
      />
      <text
        style={{
          fill: "#6d6d6d",
          fontFamily: "&quot",
          fontSize: "8.9773px",
        }}
        transform="matrix(.7214 -.3439 .8838 .4678 345.687 265.72)"
      >
        {"14:06"}
      </text>
      <defs>
        <path
          id="g"
          d="m366.55 259.886-83.568 40.877a1.94 1.94 0 0 1-1.727-.011l-28.422-14.237c-1.43-.723-1.417-2.769.023-3.473l83.568-40.877a1.94 1.94 0 0 1 1.727.011l28.422 14.237c1.43.723 1.417 2.769-.023 3.473z"
        />
      </defs>
      <clipPath id="h">
        <use
          xlinkHref="#g"
          style={{
            overflow: "visible",
          }}
        />
      </clipPath>
      <ellipse
        cx={357.795}
        cy={249.852}
        rx={61.368}
        ry={23.959}
        style={{
          opacity: 0.4,
          clipPath: "url(#h)",
          fill: "url(#SVGID_00000024692234374170449710000002833572171454571936_)",
        }}
      />
      <path
        d="m400.488 202.444-83.482 41.051a1.94 1.94 0 0 1-1.727-.008l-62.084-31.212c-1.431-.72-1.422-2.766.015-3.473l83.482-41.051a1.94 1.94 0 0 1 1.727.008l62.084 31.212c1.431.72 1.422 2.766-.015 3.473z"
        style={{
          fill: "#c3ca9c",
        }}
      />
      <path
        d="M398.969 197.708h2.594v3.076h-2.594zM252.118 207.552h2.594v3.076h-2.594z"
        style={{
          fill: "#c3ca9c",
        }}
      />
      <path
        d="m400.488 199.54-83.482 41.051a1.94 1.94 0 0 1-1.727-.008l-62.084-31.212c-1.431-.72-1.422-2.766.015-3.473l83.482-41.051a1.94 1.94 0 0 1 1.727.008l62.084 31.212c1.431.719 1.422 2.766-.015 3.473z"
        style={{
          // fill: "#edffd0",
          fill: `${PRIMARY_MAIN}`,
        }}
      />
      <path
        d="m343.91 173.86-73.963 35.757-4.084-1.906 73.963-35.757zM352.985 178.035l-73.963 35.756-4.083-1.906 73.962-35.756zM361.697 182.028l-73.963 35.756-4.083-1.906 73.963-35.756zM331.568 204.353l-35.847 17.243-4.084-1.906 35.847-17.243z"
        style={{
          opacity: 0.3,
          fill: "#687472",
        }}
      />
      <text
        style={{
          fill: "#6d6d6d",
          fontFamily: "&quot",
          fontSize: "8.9773px",
        }}
        transform="matrix(.7214 -.3439 .8838 .4678 375.635 204.432)"
      >
        {"14:07"}
      </text>
      <defs>
        <path
          id="i"
          d="m236.68 285.711-83.482 41.051a1.94 1.94 0 0 1-1.727-.008l-62.084-31.212c-1.431-.72-1.422-2.766.015-3.473l83.482-41.051a1.94 1.94 0 0 1 1.727.008l62.084 31.212c1.432.72 1.423 2.766-.015 3.473z"
        />
      </defs>
      <clipPath id="j">
        <use
          xlinkHref="#i"
          style={{
            overflow: "visible",
          }}
        />
      </clipPath>
      <ellipse
        cx={165.582}
        cy={264.297}
        rx={61.368}
        ry={23.959}
        style={{
          opacity: 0.6,
          clipPath: "url(#j)",
          fill: "url(#SVGID_00000129894300478394498820000003963673272403033234_)",
        }}
      />
      <path
        d="m229.057 217.52-83.482 41.051a1.94 1.94 0 0 1-1.727-.008l-37.354-19.303c-1.431-.72-1.422-2.766.015-3.473l83.482-41.051a1.94 1.94 0 0 1 1.727.008l37.354 19.303c1.432.719 1.423 2.766-.015 3.473z"
        style={{
          fill: "#cbcac2",
        }}
      />
      <path
        d="M227.538 212.784h2.594v3.076h-2.594zM105.418 234.537h2.594v3.076h-2.594z"
        style={{
          fill: "#c3ca9c",
        }}
      />
      <path
        d="m229.057 214.615-83.482 41.051a1.94 1.94 0 0 1-1.727-.008l-37.354-19.302c-1.431-.72-1.422-2.766.015-3.473l83.482-41.051a1.94 1.94 0 0 1 1.727.008l37.354 19.302c1.432.72 1.423 2.766-.015 3.473z"
        style={{
          // fill: "#f8ffec",
          fill: `${PRIMARY_MAIN}`,
        }}
      />
      <path
        d="m213.856 210.193-38.297 18.605-4.084-1.906 38.297-18.604z"
        style={{
          opacity: 0.3,
          fill: "#687472",
        }}
      />
      <text
        style={{
          fill: "#6d6d6d",
          fontFamily: "&quot",
          fontSize: "8.9773px",
        }}
        transform="matrix(-.7214 .3439 -.8838 -.4678 131.016 225.608)"
      >
        {"14:05"}
      </text>
      <path
        d="M166.289 229.974c-4.129-2.641-11.748-2.613-17.018.061-5.27 2.675-6.194 6.984-2.065 9.624s11.748 2.613 17.018-.061c5.269-2.675 6.194-6.984 2.065-9.624z"
        style={{
          fill: "#ffdd45",
        }}
      />
      <path d="M162.676 234.428c-.717-.458-1.713-.619-2.226-.359-.512.26-.347.842.37 1.301.717.458 1.713.619 2.226.359.513-.26.347-.843-.37-1.301zM157.11 237.253c-.717-.459-1.713-.619-2.226-.359-.512.26-.347.842.37 1.301.717.458 1.713.619 2.226.359.513-.26.347-.843-.37-1.301z" />
      <path
        d="M160.796 231.695c-2.339-.348-5.093.018-7.216 1.096-2.223 1.128-3.166 2.738-2.684 4.15"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: 0.9121,
          strokeLinecap: "round",
          strokeMiterlimit: 10,
        }}
      />
      <path
        d="M326.258 134.201s1.429.408 2.008 1.702c.579 1.293.885 3.948.885 3.948l-2.28 1.736-.352-.272-1.248-3.403.987-3.711z"
        style={{
          fill: "#a46a38",
        }}
      />
      <path
        d="m328.198 139.578-3.805.531-2.542-7.371 3.805-.531z"
        style={{
          fill: "#efe5dc",
        }}
      />
      <path
        d="m327.654 138.544-3.071.428-2.051-5.949 3.07-.428z"
        style={{
          fill: "#aaffc2",
        }}
      />
      <path
        d="M333.041 152.615c-2.921-3.575-4.298-5.869-6.521-11.301l2.375-2.133 8.828 8.192-4.682 5.242z"
        style={{
          fill: "#a46a38",
        }}
      />
      <path
        d="M331.93 150.34c.042 1.184.728 1.96 1.549 2.465 1.355.834 3.061.862 4.522.232l9.842-4.244-.972-7.328-11.388 4.046c-.001 0-3.687 1.108-3.553 4.829z"
        style={{
          fill: "#a46a38",
        }}
      />
      <path
        d="M349.047 139.006c4.136.212 4.242 6.893 2.757 8.802-1.485 1.909-9.968 4.666-9.968 4.666s-2.863-1.697-3.288-4.56c-.424-2.863 1.379-5.196 1.379-5.196l9.12-3.712z"
        style={{
          fill: "#ff5f2c",
        }}
      />
      <path
        d="M346.265 215.2c-2.02-.313-8.78-4.021-8.78-4.021l-.513-.528a1.924 1.924 0 0 1-.424-.693c-.255.707-.136 1.523.424 2.1l.513.528s6.76 3.709 8.78 4.021c2.02.313 6.294-1.169 6.061-3.491a35.965 35.965 0 0 0-.078-.703c-.576 1.908-4.176 3.066-5.983 2.787z"
        style={{
          fill: "#a9b4c0",
        }}
      />
      <path
        d="M337.485 211.178s6.76 3.709 8.78 4.021c1.807.28 5.407-.879 5.982-2.788a35.527 35.527 0 0 0-.543-3.314l-5.361-1.663-4.705.177a8.922 8.922 0 0 0-4.15 1.214 2.147 2.147 0 0 0-.94 1.131c.092.25.225.488.424.693l.513.529z"
        style={{
          fill: "#002245",
        }}
      />
      <path
        d="M340.483 209.378h-.749c1.001-.858 2.298-1.577 3.483-1.838h.749c-1.23.299-2.539 1.017-3.483 1.838zM342.083 209.548h-.749c.787-.84 2.207-1.535 3.642-2.019h.749c-1.186.453-2.691 1.065-3.642 2.019z"
        style={{
          fill: "#cad1d8",
        }}
      />
      <path
        d="M338.029 219.284c-2.02-.313-8.78-4.021-8.78-4.021l-.513-.528a1.924 1.924 0 0 1-.424-.693c-.255.707-.136 1.523.424 2.1l.513.528s6.76 3.709 8.78 4.021c2.02.313 6.294-1.169 6.061-3.491a35.965 35.965 0 0 0-.078-.703c-.576 1.908-4.176 3.066-5.983 2.787z"
        style={{
          fill: "#a9b4c0",
        }}
      />
      <path
        d="M329.249 215.262s6.76 3.709 8.78 4.021c1.807.28 5.407-.879 5.982-2.788a35.527 35.527 0 0 0-.543-3.314l-5.361-1.663-4.705.177a8.91 8.91 0 0 0-4.15 1.214 2.147 2.147 0 0 0-.94 1.131c.092.25.225.488.424.693l.513.529z"
        style={{
          fill: "#002245",
        }}
      />
      <path
        d="M332.248 213.462h-.749c1.001-.858 2.298-1.577 3.483-1.838h.749c-1.231.299-2.54 1.017-3.483 1.838zM333.847 213.632h-.749c.787-.84 2.206-1.534 3.641-2.019h.749c-1.185.452-2.69 1.065-3.641 2.019z"
        style={{
          fill: "#cad1d8",
        }}
      />
      <path
        d="M317.279 156.036c.569-4.581 2.817-9.877 5.212-15.235l3.183.245-1.371 14.757-7.024.233z"
        style={{
          fill: "#a46a38",
        }}
      />
      <path
        d="M317.228 156.329c.042 1.184.728 1.96 1.549 2.465 1.355.834 3.06.862 4.522.232l9.842-4.244-.973-7.328-11.388 4.046s-3.686 1.108-3.552 4.829z"
        style={{
          fill: "#a46a38",
        }}
      />
      <path
        d="m345.395 210.273 3.919.14a2.552 2.552 0 0 0 2.67-2.67l-.027-.74a2.997 2.997 0 0 1 0-.212l1.629-34.236-10.459 2.019-.475 32.808a2.812 2.812 0 0 0 .564 1.735 2.86 2.86 0 0 0 2.179 1.156z"
        style={{
          fill: "#818a88",
        }}
      />
      <path
        d="M345.418 209.378s-.613-11.163-.749-16.267c-.136-5.105-.817-11.162-.817-11.162"
        style={{
          opacity: 0.5,
          fill: "none",
          stroke: "#646f6d",
          strokeWidth: 0.2723,
          strokeMiterlimit: 10,
        }}
      />
      <path
        d="m341.04 216.263-3.919.14a2.552 2.552 0 0 1-2.67-2.67l.027-.74a2.498 2.498 0 0 0 0-.212l-1.516-36.482 11.707 3.676-.886 33.398a2.812 2.812 0 0 1-.564 1.735 2.865 2.865 0 0 1-2.179 1.155z"
        style={{
          fill: "#94a09e",
        }}
      />
      <path
        d="M332.962 176.299s-.363-2.087.908-3.63c1.271-1.543 12.251-5.99 12.251-5.99s2.359 0 4.447.908c2.087.908 2.995 4.084 2.995 4.084s.544 5.082-1.452 6.625c-1.996 1.543-8.803 5.082-8.803 5.082l-10.346-7.079z"
        style={{
          fill: "#94a09e",
        }}
      />
      <path
        d="M333.235 173.485s6.262 2.269 9.348 1.996c3.086-.272 10.436-5.354 10.436-5.354s1.089-1.543 1.089-3.721-1.18-4.175-1.18-4.175l-.544-16.063s.181-4.265-2.178-5.99c-.716-.523-1.59-.904-2.461-1.181-2.127-.677-4.425-.539-6.487.316-3.233 1.34-7.154 3.702-7.342 3.702-.272 0-2.518 3.04-2.246 5.309.272 2.269.023 7.192.023 7.192l.544 12.796c-.001 0-.545 3.993.998 5.173z"
        style={{
          fill: "#ff551f",
        }}
      />
      <path
        d="M334.345 144.995c4.136.212 4.242 6.893 2.757 8.802-1.485 1.909-9.968 4.666-9.968 4.666s-2.863-1.697-3.287-4.56 1.379-5.196 1.379-5.196l9.119-3.712z"
        style={{
          fill: "#ff5f2c",
        }}
      />
      <path
        d="M322.31 141.314c.068-1.463 1.021-2.212 1.021-2.212l1.021-1.191.102-1.293.715-.102.579 1.191.51 1.974-.715 2.518M326.088 136.413l.17 1.191s.068 1.293.783 1.804c.715.51 1.94.681 1.94.681l.17-.783-1.293-2.008-.545-.102-.612-.953-.613.17z"
        style={{
          fill: "#a46a38",
        }}
      />
      <path
        d="M322.583 134.95s-.715 1.191-1.089 2.11c-.374.919.238 2.28.238 2.28l.783 1.77 1.055.306 1.906-2.246-2.893-4.22z"
        style={{
          fill: "#a46a38",
        }}
      />
      <path
        d="m336.434 175.958.885 5.717c-.001.001-2.451-1.837-.885-5.717z"
        style={{
          fill: "#646f6d",
        }}
      />
      <path
        d="M337.318 181.676s0 11.639.204 18.309c.204 6.67.136 14.021.136 14.838"
        style={{
          opacity: 0.5,
          fill: "none",
          stroke: "#646f6d",
          strokeWidth: 0.2723,
          strokeMiterlimit: 10,
        }}
      />
      <path
        d="M337.795 141.963s1.225 1.938 5.037 1 4.084-2.313 4.084-2.313-2.382-.688-4.56-.563c-2.179.125-4.561 1.876-4.561 1.876z"
        style={{
          fill: "#a46a38",
        }}
      />
      <path
        d="m346.031 140.701-2.11-4.288s1.021-2.178 1.429-4.969c.408-2.791-.749-7.827-5.513-7.827s-5.99 3.744-5.853 5.377c.136 1.633.544 2.11.544 2.11s-.272 4.152 2.314 6.806c.749-.068 1.361-.545 1.361-.545s.613 1.77.613 2.859-.068 1.702-.068 1.702 2.314 1.906 7.283-1.225z"
        style={{
          fill: "#a46a38",
        }}
      />
      <path
        d="m334.004 127.998.03 1.556.733.102c-.149 1.088-.247 2.344.516 3.134.224.232.509.402.81.518.985.377 2.256.081 2.787-.83.049.844.28 1.678.673 2.427.316.602.798 1.189 1.466 1.311.668.122 1.453-.491 1.262-1.143.742.291.413 1.632 1.117 2.007.688.366 1.396-.611 2.175-.597a2.651 2.651 0 0 0 2.613-.226 2.655 2.655 0 0 0 1.086-2.387c-.062-.603-.302-1.311.12-1.746.328-.338.868-.293 1.332-.374 1.053-.184 1.816-1.09 2.405-1.982.412-.624.796-1.292.907-2.032.111-.739-.103-1.568-.7-2.018-.258-.195-.573-.31-.813-.526-.241-.216-.388-.599-.2-.862.12-.167.334-.232.507-.344.582-.379.597-1.28.217-1.861s-1.029-.918-1.649-1.231l-.024-1.798a13.305 13.305 0 0 0-3.106-2.593l-.363.443c-.626.321-1.315-.326-1.63-.954-.314-.629-.613-1.402-1.296-1.569-.619-.152-1.299.429-1.246 1.064-.62.076-1.233-.16-1.805-.411-.572-.251-1.157-.528-1.782-.538-.625-.01-1.306.332-1.464.937-.062.239-.046.513-.204.703-.305.367-.897.09-1.259-.22-.362-.31-.886-.654-1.263-.362l-.191 1.749c-.751-.059-1.401.824-1.121 1.523-.883-.356-1.994-.016-2.525.774s-.428 1.947.235 2.631c-.473-.322-1.159.081-1.351.62-.239.673.056 1.313.102 1.984.032.473-.178.941-.139 1.395.127 1.445 1.894 1.656 3.038 1.726z"
        style={{
          fill: "#1a0e00",
        }}
      />
      <text
        style={{
          fontFamily: "&quot",
          fontSize: "35.0495px",
        }}
        transform="translate(37.465 74.671)"
      >
        {"Hy' " + user.name ?? "Dear"}
      </text>
      <radialGradient
        id="k"
        cx={184.243}
        cy={120.166}
        r={28.322}
        gradientTransform="matrix(1 0 0 .3904 0 169.819)"
        gradientUnits="userSpaceOnUse"
      >
        <stop
          offset={0}
          style={{
            stopColor: "#749993",
          }}
        />
        <stop
          offset={1}
          style={{
            stopColor: "#749993",
            stopOpacity: 0,
          }}
        />
      </radialGradient>
      <ellipse
        cx={184.243}
        cy={216.731}
        rx={28.322}
        ry={11.057}
        style={{
          opacity: 0.6,
          fill: "url(#k)",
        }}
      />
      <path
        d="M184.223 151.706s1.678.969 3.243.671c1.566-.298 1.491-3.504 1.491-3.504s-3.653.559-4.734 2.833z"
        style={{
          fill: "#c59758",
        }}
      />
      <path
        d="m181.514 139.006 1.491-1.044s-2.038-3.827-5.319-3.48c.646 3.678 2.982 4.971 2.982 4.971l.846-.447z"
        style={{
          fill: "#ffa7c5",
        }}
      />
      <path
        d="m182.164 137.384 6.743 10.466s.558 1.723-.809 2.926-3.368.073-3.368.073l-6.547-11.111 3.981-2.354z"
        style={{
          fill: "#c59758",
        }}
      />
      <path
        d="m183.946 161.275-2.375-6.295.154-5.548 2.05-3.206a3.637 3.637 0 0 0-.069-3.38l-2.193-3.342c-.864-1.566-1.04-3.523-2.585-4.424l-1.05-.912c-1.689-.984-4.145-.545-7.099.995-1.537.801-4.632 2.835-4.632 2.835-2.684 2.634-1.603 4.677-1.717 7.389-.067 1.586 3.214 5.878 3.269 8.167.055 2.29-.718 9.282-.718 9.282s3.311 5.666 8.691 4.49c5.38-1.177 8.274-6.051 8.274-6.051z"
        style={{
          fill: "#ffb3cd",
        }}
      />
      <path
        d="M167.431 183.859s.96 14.108 1.303 15.204c0 0-1.205 3.294-.522 6.938.683 3.644 2.33 10.042 2.33 10.042s.544 1.251 1.964.756c1.42-.496 1.097-1.854 1.097-1.854l2.6-30.334-8.772-.752z"
        style={{
          fill: "#d5a46d",
        }}
      />
      <path
        d="M177.344 178.431s.688 14.061 1.008 15.148c0 0-1.257 3.316-.648 6.938.61 3.622 2.123 9.97 2.123 9.97s.516 1.237 1.935.709c1.418-.528 1.123-1.876 1.123-1.876l3.148-30.341-8.689-.548z"
        style={{
          fill: "#d19b5f",
        }}
      />
      <path
        d="M162.088 181.326s-1.784 3.129 2.309 4.722 8.785 3.126 12.524 2.2c8.598-2.129 11.57-3.418 11.57-3.418s3.538-1.265 1.689-4.162c-1.849-2.897-6.629-19.392-6.629-19.392s-2.644 2.441-7.747 2.997c-5.205.567-8.717-1.721-8.717-1.721l-4.999 18.774z"
        style={{
          fill: "#ff5e77",
        }}
      />
      <path
        d="M189.16 215.278s-4.86.032-5.871-.368l-3.08-1.217-.626-.5a2.415 2.415 0 0 1-.868-1.507c-.04.759.23 1.524.868 2.033l.626.5 3.08 1.217c1.012.4 5.871.368 5.871.368 1.468.042 2.557-1.24 2.392-2.62-.128 1.161-1.114 2.13-2.392 2.094z"
        style={{
          fill: "#f2f2f2",
        }}
      />
      <path
        d="M181.32 209.087c-.064.258.04.806.091 1.245.067-.226-.043-.783-.091-1.245z"
        style={{
          fill: "#ff4361",
        }}
      />
      <path
        d="M179.759 210.284c.15.97 1.373.822 1.604.67.093-.061.083-.316.048-.622-.012.04-.023.08-.048.096-.231.152-1.454.3-1.604-.67a2.5 2.5 0 0 1-.621.096 2.417 2.417 0 0 0-.423 1.833c.024-.457.135-.913.423-1.307.226-.005.43-.041.621-.096z"
        style={{
          fill: "#ff4361",
        }}
      />
      <path
        d="m180.209 213.693 3.08 1.217c1.012.4 5.871.368 5.871.368 1.278.036 2.264-.933 2.392-2.094a2.345 2.345 0 0 0-.109-.504l-3.756-1.21-3.477-2.413c-.728-1.082-1.845-.671-2.812-.099-.038.022-.063.068-.078.13.049.462.158 1.02.091 1.245.035.306.046.56-.048.622-.231.152-1.454.3-1.604-.67a2.5 2.5 0 0 1-.621.096c-.288.394-.398.85-.423 1.307a2.41 2.41 0 0 0 .868 1.507l.626.498z"
        style={{
          fill: "#ff4361",
        }}
      />
      <path
        d="M179.558 220.879s-4.86.032-5.871-.368l-3.08-1.217-.626-.5c-.501-.4-.798-.96-.885-1.55-.112.824.19 1.686.885 2.24l.626.5 3.08 1.217c1.012.4 5.871.368 5.871.368 1.48.042 2.572-1.262 2.385-2.655a2.35 2.35 0 0 1-2.385 1.965z"
        style={{
          fill: "#f2f2f2",
        }}
      />
      <path
        d="m169.981 218.795.626.5 3.08 1.217c1.012.4 5.871.368 5.871.368 1.23.035 2.2-.861 2.385-1.964a2.409 2.409 0 0 0-.101-.47l-3.756-1.21-3.477-2.413c-1.186-1.762-3.439.268-4.362.668-.228.099-.456.317-.669.59-.274.35-.426.753-.482 1.165.088.588.384 1.149.885 1.549z"
        style={{
          fill: "#ff4361",
        }}
      />
      <path
        d="M173.018 216.382s1.085-1.134 2.095-1.257c-.296.592-1.356 2.046-1.356 2.046l2.169-1.257-.986 1.849 1.553-1.381-.715 1.602 2.046-1.159-1.43 1.504 2.786-1.159-2.219 1.553M184.21 209.315l-1.701 1.035 2.811-.715-2.416 1.307 3.106-.789-2.49 1.577 2.983-1.232-1.504 1.38 2.293-.764-1.726 1.479 2.268-.986-.887 1.134"
        style={{
          fill: "none",
          stroke: "#f2f2f2",
          strokeWidth: 0.3944,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: 10,
        }}
      />
      <path
        d="m183.85 149.857 1.044-5.087 4.064-1.047.298.155-1.305 5.967-4.101 1.317-.261-.35z"
        style={{
          fill: "#f7f1e8",
        }}
      />
      <path
        d="m168.056 141.381 4.489 9.533c.152.41.62.603 1.017.419l8.77-2.862 1.476-1.292 1.975.075.015.526-1.498.503 2.313.394 2.796-1.132-.565 3.239-3.045 1.6-4.095-.606-8.419 3.64a2.217 2.217 0 0 1-3.047-.873l-6.071-10.319c-.001-.001 1.66-2.409 3.889-2.845z"
        style={{
          fill: "#d5a46d",
        }}
      />
      <path
        d="M164.862 147.258s-.06-1.347 1.817-2.234 3.501-.828 3.501-.828-.406-5.263-2.436-6.032c-2.03-.769-3.291.59-3.697 2.719-.405 2.129.815 6.375.815 6.375z"
        style={{
          fill: "#ffb3cd",
        }}
      />
      <path
        d="m169.052 137.055 1.857 1.217s4.098 4.546 5.635 3.842c1.537-.704.448-5.443.448-5.443l-1.665-1.985s-2.219-.098-4.268.35c-1.096 1.624-2.007 2.019-2.007 2.019z"
        style={{
          fill: "#d5a46d",
        }}
      />
      <path
        d="M170.678 132.942s.795 1.988-.149 3.43c1.193.497 3.032.944 3.032.944l2.286-.895-.249-2.784-4.92-.695z"
        style={{
          fill: "#d5a46d",
        }}
      />
      <path
        d="M178.73 128.479c0 3.486-2.203 7.644-4.921 7.644-2.718 0-4.921-4.158-4.921-7.644 0-3.486 2.203-6.174 4.921-6.174 2.718 0 4.921 2.687 4.921 6.174z"
        style={{
          fill: "#d5a46d",
        }}
      />
      <path
        d="M169.311 128.667s-.646-1.616-1.814-1.094c-1.168.522-.199 3.007.845 3.678 1.044.671 1.516-.298 1.516-.298l-.547-2.286z"
        style={{
          fill: "#d5a46d",
        }}
      />
      <path
        d="M178.805 119.571s-1.765-1.243-4.25-1.019c-2.485.224-5.816.87-7.009 2.361-1.168 1.46-1.642 4.849-.181 6.657a2.01 2.01 0 0 1 .398-.04c.849 0 1.084.169 1.308.782.121.209.235.445.295.728.174.82.118 1.019.118 1.019l.547-.149s-.273-1.268.174-1.939 1.069-.472 1.069-1.417c0-.944.199-1.168.199-1.168s1.616-.994 3.629-1.218c2.013-.224 2.982 1.218 2.982 1.218s1.143-.149 1.466-2.46c.324-2.311-.745-3.355-.745-3.355z"
        style={{
          fill: "#3f2900",
        }}
      />
      <path
        d="M167.347 122.404s-2.088 1.292-2.982-1.491 2.088-5.368 3.678-4.772c1.591.596 2.784 3.181 2.784 3.181l-3.48 3.082z"
        style={{
          fill: "#3f2900",
        }}
      />
    </svg>
  );
}

export default memo(NoChat);
