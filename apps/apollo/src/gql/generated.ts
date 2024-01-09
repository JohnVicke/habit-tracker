/* eslint-disable */
// @ts-nocheck
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateHabitInput: CreateHabitInput;
  CreateStreakInput: CreateStreakInput;
  Dashboard: ResolverTypeWrapper<Dashboard>;
  Habit: ResolverTypeWrapper<Habit>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SignUpResponse: ResolverTypeWrapper<SignUpResponse>;
  Streak: ResolverTypeWrapper<Streak>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateHabitInput: UpdateHabitInput;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateHabitInput: CreateHabitInput;
  CreateStreakInput: CreateStreakInput;
  Dashboard: Dashboard;
  Habit: Habit;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  SignUpResponse: SignUpResponse;
  Streak: Streak;
  String: Scalars['String']['output'];
  UpdateHabitInput: UpdateHabitInput;
  User: User;
}>;

export type DashboardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dashboard'] = ResolversParentTypes['Dashboard']> = ResolversObject<{
  completedHabits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  longestStreak?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalHabits?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HabitResolvers<ContextType = any, ParentType extends ResolversParentTypes['Habit'] = ResolversParentTypes['Habit']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frequency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  streaks?: Resolver<Array<ResolversTypes['Streak']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createHabit?: Resolver<ResolversTypes['Habit'], ParentType, ContextType, RequireFields<MutationCreateHabitArgs, 'input'>>;
  createStreak?: Resolver<ResolversTypes['Streak'], ParentType, ContextType, RequireFields<MutationCreateStreakArgs, 'input'>>;
  deleteHabit?: Resolver<ResolversTypes['Habit'], ParentType, ContextType, RequireFields<MutationDeleteHabitArgs, 'id'>>;
  deleteStreak?: Resolver<ResolversTypes['Streak'], ParentType, ContextType, RequireFields<MutationDeleteStreakArgs, 'id'>>;
  signUp?: Resolver<ResolversTypes['SignUpResponse'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'password' | 'username'>>;
  updateHabit?: Resolver<ResolversTypes['Habit'], ParentType, ContextType, RequireFields<MutationUpdateHabitArgs, 'id' | 'input'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  dashboard?: Resolver<Maybe<ResolversTypes['Dashboard']>, ParentType, ContextType>;
  habit?: Resolver<Maybe<ResolversTypes['Habit']>, ParentType, ContextType, RequireFields<QueryHabitArgs, 'id'>>;
  habits?: Resolver<Array<ResolversTypes['Habit']>, ParentType, ContextType>;
  streak?: Resolver<Maybe<ResolversTypes['Streak']>, ParentType, ContextType, RequireFields<QueryStreakArgs, 'id'>>;
  streaks?: Resolver<Array<ResolversTypes['Streak']>, ParentType, ContextType>;
}>;

export type SignUpResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignUpResponse'] = ResolversParentTypes['SignUpResponse']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StreakResolvers<ContextType = any, ParentType extends ResolversParentTypes['Streak'] = ResolversParentTypes['Streak']> = ResolversObject<{
  endDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  habit?: Resolver<ResolversTypes['Habit'], ParentType, ContextType>;
  habitId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  startDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  habits?: Resolver<Array<Maybe<ResolversTypes['Habit']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Dashboard?: DashboardResolvers<ContextType>;
  Habit?: HabitResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignUpResponse?: SignUpResponseResolvers<ContextType>;
  Streak?: StreakResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

