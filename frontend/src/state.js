import { atomWithStorage } from "jotai/utils";

const token = atomWithStorage("token", "");
const companyNameSearched = atomWithStorage("", "");
const username = atomWithStorage("", "");
const company = atomWithStorage("", "");
const activeSidebar = atomWithStorage(false, "");

const state = { token, companyNameSearched, activeSidebar };

export default state;
