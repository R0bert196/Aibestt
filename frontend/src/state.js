import { atomWithStorage } from "jotai/utils";

const token = atomWithStorage("token", "");

const state = { token };

export default state;
