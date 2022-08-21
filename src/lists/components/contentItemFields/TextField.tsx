import { TextField as MuiTextField } from "@mui/material";
import { useState } from "react";

type Props = {
  value: string
  label: string
}

export const TextField: React.FC<Props> = ({ value, label }) => {
  const [newValue, setNewValue] = useState(value);

  return <MuiTextField label={label} value={newValue} onChange={e => setNewValue(e.target.value)} fullWidth multiline />
}