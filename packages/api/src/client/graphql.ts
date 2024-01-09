/* eslint-disable */
// @ts-nocheck
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateHabitInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  frequency: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateStreakInput = {
  endDate: Scalars['String']['input'];
  habitId: Scalars['ID']['input'];
  startDate: Scalars['String']['input'];
};

export type Dashboard = {
  __typename?: 'Dashboard';
  completedHabits: Scalars['Int']['output'];
  longestStreak: Scalars['Int']['output'];
  totalHabits: Scalars['Int']['output'];
};

export type Habit = {
  __typename?: 'Habit';
  description?: Maybe<Scalars['String']['output']>;
  frequency: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  streaks: Array<Streak>;
  user: User;
  userId: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createHabit: Habit;
  createStreak: Streak;
  deleteHabit: Habit;
  deleteStreak: Streak;
  signUp: SignUpResponse;
  updateHabit: Habit;
};


export type MutationCreateHabitArgs = {
  input: CreateHabitInput;
};


export type MutationCreateStreakArgs = {
  input: CreateStreakInput;
};


export type MutationDeleteHabitArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStreakArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSignUpArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateHabitArgs = {
  id: Scalars['ID']['input'];
  input: UpdateHabitInput;
};

export type Query = {
  __typename?: 'Query';
  dashboard?: Maybe<Dashboard>;
  habit?: Maybe<Habit>;
  habits: Array<Habit>;
  streak?: Maybe<Streak>;
  streaks: Array<Streak>;
};


export type QueryHabitArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStreakArgs = {
  id: Scalars['ID']['input'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  token: Scalars['String']['output'];
};

export type Streak = {
  __typename?: 'Streak';
  endDate: Scalars['String']['output'];
  habit: Habit;
  habitId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  startDate: Scalars['String']['output'];
};

export type UpdateHabitInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  habits: Array<Maybe<Habit>>;
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};
