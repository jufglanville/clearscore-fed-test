import { useState } from "react";
import styled from "styled-components";
import { InputType } from "../types";

import editImg from "../assets/edit.png";

interface Props {
  type: InputType;
  maxLength?: number;
  focus?: boolean;
  value?: string;
  onChange: (value: string) => void;
}

const Input = ({ type, maxLength, focus, value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(focus);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (!maxLength || newValue.length <= maxLength) {
      setInputValue(newValue);
    }
  };

  const saveValue = () => {
    // Compare current string with old string
    if (value !== inputValue) {
      onChange(inputValue || "");
    }
    setIsFocused(false);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      saveValue();
      e.currentTarget.blur();
    }
  };

  const adjustTextAreaHeight = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "auto";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  return (
    <Container>
      <InputElement
        rows={1}
        autoFocus={isFocused}
        placeholder={`Enter a ${type}`}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={saveValue}
        onKeyDown={onEnter}
        onInput={adjustTextAreaHeight}
      />
      {maxLength && isFocused && (
        <MaxLength>
          {maxLength - (inputValue?.length || 0)} characters left
        </MaxLength>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const InputElement = styled.textarea`
  border: none;
  padding: 0.5rem 1.5rem 0.5rem 0.5rem;
  font-size: inherit;
  font-weight: inherit;
  outline: none;
  border-radius: 0.5rem;
  width: 100%;
  height: 65px;
  background-image: url(${editImg});
  background-repeat: no-repeat;
  background-position: right 0.2rem bottom 0.2rem;
  background-size: 1.5rem;
  cursor: pointer;
  &:focus {
    background-color: #efefef;
    // background-image: none;
  }
  &::placeholder {
    color: grey;
  }
`;

const MaxLength = styled.p`
  position: absolute;
  bottom: -1rem;
  right: 0;
  font-size: 0.8rem;
  color: grey;
`;

export default Input;
