import { useState, useEffect } from "react";
import styles from "./select.module.css";

export type SelectOption = {
  label: string;
  value: number;
};

type MultipleSelectProps = {
  multiple?: true;
  onChange: (value: SelectOption[] | undefined) => void;
  value?: SelectOption[];
};
type SingleSelectProps = {
  multiple?: false;
  onChange: (value: SelectOption | undefined) => void;
  value?: SelectOption;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

const Select = (props: SelectProps) => {
  const { options, onChange, value, multiple } = props;

  const [isOpen, setisOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined);
  }
  function selectOption(option: SelectOption) {
    if (multiple) {
      if (value?.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...(value || []), option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  }

  function optionIsSelected(option: SelectOption) {
    return multiple ? value?.includes(option) : option === value;
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);
  return (
    <>
      <div
        onBlur={() => setisOpen(false)}
        onClick={() => setisOpen((prev) => !prev)}
        tabIndex={0}
        className={styles.container}
      >
        <span className={styles.value}>{multiple ? value?.map(v => (
            <button className={styles['option-badge']} onClick={e => {
                e.stopPropagation()
                selectOption(v)
            }} key={v.value}>{v.label} <span className={styles['remove-btn']}>&times;</span></button>
        )) : value?.label}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearOptions();
          }}
          className={styles["clear-btn"]}
        >
          &times;
        </button>
        <div className={styles.divider}></div>
        <div className={styles.caret}></div>
        <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
          {options.map((option, index) => (
            <li
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
                setisOpen(false);
              }}
              key={option.label}
              className={`${styles.option} ${
                optionIsSelected(option) ? styles.selected : ""
              } ${index === highlightedIndex ? styles.highlighted : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Select;
