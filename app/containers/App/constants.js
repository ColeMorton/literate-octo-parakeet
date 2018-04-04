/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = "boilerplate/App/LOAD_REPOS";
export const LOAD_REPOS_SUCCESS = "boilerplate/App/LOAD_REPOS_SUCCESS";
export const LOAD_REPOS_ERROR = "boilerplate/App/LOAD_REPOS_ERROR";
export const DEFAULT_LOCALE = "en";

export const INIT = "boilerplate/App/INIT";

export const LOG_IN = "boilerplate/App/LOG_IN";
export const LOG_IN_PENDING = "boilerplate/App/LOG_IN_PENDING";
export const LOG_IN_SUCCESS = "boilerplate/App/LOG_IN_SUCCESS";
export const LOG_IN_ERROR = "boilerplate/App/LOG_IN_ERROR";

export const START_SESSION = "boilerplate/App/START_SESSION";

export const LOG_OUT = "boilerplate/App/LOG_OUT";
