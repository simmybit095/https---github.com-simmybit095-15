import { User } from "./src/models/results";

export type RootStackParamList = {
    Home: undefined;
    APIList: undefined;
    UserDetails: { user: User };
    Puzzle15: undefined;
};