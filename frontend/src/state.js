import { atomWithStorage } from "jotai/utils";

const token = atomWithStorage("token", "");
const companyNameSearched = atomWithStorage("", "");
const username = atomWithStorage("", "");
const company = atomWithStorage("", "");

const state = { token, companyNameSearched };

export default state;
