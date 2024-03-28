import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar"; // Импортируем Toolbar из Material-UI
import IconButton from "@mui/material/IconButton"; // IconButton теперь из Material-UI
import Button from "@mui/material/Button";
import Box from "@mui/material/Box"; // Box тоже из Material-UI
import Avatar from "@mui/material/Avatar";
// Иконки уже импортированы из MUI Icons
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import AppLogo from "./pictures/AppLogo.png";
import Link from "@mui/material/Link";
// import { Link } from "react-router-dom"; // Используется для роутинга

const NavBar = () => {
  return (
    <AppBar
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "space-between", // Стиль остается прежним
        padding: "8px 16px", // Стиль остается прежним
      }}
    >
      {/* Изменения начинаются здесь: заменил Box на Toolbar для размещения элементов навигации */}
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between", // Обеспечиваем распределение элементов по краям
          width: "98%", // Занимаем всю ширину AppBar
        }}
      >
        {/* Левая группа иконок */}
        <Box>
          <Link href="#">
            <img
              src={AppLogo}
              alt="AppLogo"
              height="60x"
              width="60px"
              style={{ borderRadius: "100px" }}
            />
          </Link>
          <IconButton color="inherit">
            <SearchIcon />
            {/* Место для реализации открытия окна поиска */}
          </IconButton>
        </Box>
        {/* Правая группа иконок */}
        <Box>
          <IconButton color="inherit">
            <EmailIcon />
          </IconButton>
          <IconButton color="inherit">
            <PersonIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import IconButton from "@mui/joy/IconButton";
// import Box from "@mui/joy/Box";
// // Импорт иконок из MUI Icons, если Joy-UI напрямую не предоставляет иконки
// import SearchIcon from "@mui/icons-material/Search";
// import EmailIcon from "@mui/icons-material/Email";
// import PersonIcon from "@mui/icons-material/Person";
// import HomeIcon from "@mui/icons-material/Home";
// import { Link } from "react-router-dom"; // Используйте, если вы настроили react-router
// import { Grid } from "@mui/material";

// const NavBar = () => {
//   return (
//     <AppBar
//       component="nav"
//       sx={{
//         display: "flex",
//         justifyContent: "space-between",
//         // alignItems: "center",
//         padding: "8px 16px",
//       }}
//     >
//       <Box
//         sx={{
//           display: "grid",
//           gridTemplateColumns: "1fr auto",
//           gap: 2,
//           width: "100%",
//         }}
//       >
//         <Box gridColumn="span 1">
//           <IconButton color="neutral">
//             <HomeIcon />
//           </IconButton>
//           <IconButton color="neutral">
//             <SearchIcon />
//             {/* Открытие окна поиска может быть реализовано здесь */}
//           </IconButton>
//         </Box>
//         <Box gridColumn="span 1">
//           <IconButton color="neutral">
//             <EmailIcon />
//           </IconButton>
//           <IconButton color="neutral">
//             <PersonIcon />
//           </IconButton>
//         </Box>
//       </Box>
//     </AppBar>
//   );
// };

// export default NavBar;
