import React from "react";
import { SerializedStyles } from "@emotion/react";
export interface SharedProps {
  children: React.ReactNode;
  css?: SerializedStyles;
}
export interface Tab {
  id: string;
  name: string;
  descp: string;
}

export interface TagDto {
  name: string;
  descp: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
