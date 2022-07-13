export enum LOADING_STATUS {
  INITIAL,
  LOADING,
  FINISHED,
  ERROR,
}

export enum INDICES {
  COMPETITIONS_PROD_2021 = "competitions_2021",
  COMPETITIONS_PROD_2022 = "competitions_2022",
  CONTESTANTS_PROD_2021 = "contestants_2021",
  CONTESTANTS_PROD_2022 = "contestants_2022",
  GAME_OVER_PROD_2021 = "game_over_2021",
  // Apply these when testing
  COMPETITIONS_TEST_2021 = "competitions_test-2021",
  CONTESTANTS_TEST_2021 = "contestants_test-2021",
  GAME_OVER_TEST_2021 = "game_over_test-2021",
  COMPETITIONS_TEST_2022 = "competitions_test-2022",
  CONTESTANTS_TEST_2022 = "contestants_test-2022",
  GAME_OVER_TEST_2022 = "game_over_test-2022",
}
