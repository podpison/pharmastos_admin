import { TextField as MuiTextField } from "@mui/material";
import { useState } from "react";

type Props = {
  value: string
}

export const TextField: React.FC<Props> = ({ value }) => {
  const [newValue, setNewValue] = useState(value);

  return <li>
    <MuiTextField value={newValue} onChange={e => setNewValue(e.target.value)} />
  </li>
}