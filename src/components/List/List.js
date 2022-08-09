import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";



export const ListItemCustomize = styled(ListItem)`
:hover {
  background-color: rgba(255, 255, 255, 0.08);
}
&.Mui-selected {
  background-color: rgba(255, 255, 255, 0.16);
}
& .css-10hburv-MuiTypography-root{
  font-size:14px;
}
`;