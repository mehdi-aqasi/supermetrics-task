import React from "react";
import { IPost } from "./IPost";
import { UserPost } from "./Post";

let sample_data: Array<IPost> = [
  {
    id: "post609aa9d0d0fc9_8d8cbe38",
    from_name: "Carson Smithson",
    from_id: "user_5",
    message:
      "squash offender window compact script stress kidney guideline rear spend size retirement circulation survivor inn guideline deadly competition scholar plaster ally television promotion debate mystery housing ankle fight cruelty bolt makeup aluminium rain sweet reliable",
    type: "status",
    created_time: "2021-02-25T15:28:50+00:00",
  },
  {
    id: "post609aa9d0d0fcd_c4101e48",
    from_name: "Leonarda Schult",
    from_id: "user_3",
    message:
      "want pavement eject rehabilitation graphic rain thoughtful notice drum spell stimulation memorandum concession broadcast still concept snub swipe room deserve empirical make environmental beg AIDS grip contrast belief canvas culture factor space part run reserve plagiarize dawn haircut integrity product highway forward stress air qualified policeman midnight sun linen turkey business competition sun disability lion debut bishop offense sacrifice want trouble ban giant memorandum railroad kick option pick competition rank absorb breakfast hell quest dawn candle climate business agreement pioneer policeman section point race reserve good leave invisible bathroom chief whip",
    type: "status",
    created_time: "2021-02-25T11:29:53+00:00",
  },
  {
    id: "post609aa9d0d0fd5_53edb869",
    from_name: "Leonarda Schult",
    from_id: "user_3",
    message:
      "leaflet television conductor glory folklore spend dignity flower helmet cheese drum swallow pedestrian lot division wake generation suffer belly restrict gallon retirement fame plane border difficult velvet broadcast leaflet survey exact second alcohol mile slap queen term provide straw crash berry despise seller national variable snow horseshoe irony environmental desert magazine plain retirement transport coalition sanctuary talkative lodge delete bishop menu thaw survivor reserve part convince rubbish drum mosque pump try duck horror rob bend convince producer good album knit faithful college stereotype",
    type: "status",
    created_time: "2021-02-25T06:58:22+00:00",
  },
];

test("Test getUsersIDs", () => {
  expect(UserPost().getUsersIDs([])).toStrictEqual([]);
});

test("Test getUsersIDs", () => {
  expect(UserPost().getUsersIDs(sample_data)).toStrictEqual([
    "user_5",
    "user_3",
  ]);
});

test("Test getNumberOfUsersPost", () => {
  expect(UserPost().getNumberOfUsersPost("user_3", [])).toEqual(0);
});

test("Test getNumberOfUsersPost", () => {
  expect(UserPost().getNumberOfUsersPost("user_3", sample_data)).toEqual(2);
});

test("Test getUsers", () => {
  expect(UserPost().getUsers([])).toEqual([]);
});

test("Test getUsers", () => {
  expect(UserPost().getUsers(sample_data)).toEqual([
    {
      from_name: "Carson Smithson",
      from_id: "user_5",
      number_of_posts: 1,
    },
    {
      from_name: "Leonarda Schult",
      from_id: "user_3",
      number_of_posts: 2,
    },
  ]);
});
