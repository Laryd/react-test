import { useState } from "react";
import Select, { SelectOption } from "./components/Select";

const options = [
  {
    label: "First",
    value: 1,
  },
  {
    label: "Second",
    value: 2,
  },
  {
    label: "Third",
    value: 3,
  },
  {
    label: "Fourth",
    value: 4,
  },
  {
    label: "Fifth",
    value: 5,
  },
  {
    label: "Sixth",
    value: 6,
  },
  {
    label: "Seventh",
    value: 7,
  },
  {
    label: "Eighth",
    value: 8,
  },
  {
    label: "Nineth",
    value: 9,
  },
];
function App() {
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);

  return (
    <>
      <Select
        multiple
        options={options}
        value={value1}
        onChange={(o: SelectOption[]) => setValue1(o)}
      />
      <br />
      <Select
        options={options}
        value={value2}
        onChange={(o: SelectOption | undefined) => setValue2(o)}
      />
    </>
  );
}

export default App;
