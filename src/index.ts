import axios from "axios";
import express from "express";

interface product {
  [key: string]: string | number | undefined;
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
}

const app = express();

const storeTests = [
  {
    name: "LAYOUT_WITH_IMAGE",
    answer: "",
    description: "",
  },
  {
    name: "LAYOUT_WITHOUT_IMAGE",
    answer: "",
    description: "",
  },
  {
    name: "LAYOUT_WITH_EXPENSIVE_PRICE",
    answer: "",
    description: "",
  },
];

const userTests = [
  {
    name: "GET_USER",
    answer: "",
    description: "",
  },
  {
    name: "PUT_USER",
    answer: "",
    description: "",
  },
  {
    name: "POST_USER",
    answer: "",
    description: "",
  },
  {
    name: "DELETE_USER",
    answer: "",
    description: "",
  },
];

app.get("/store", async (req, res) => {
  const responseWithImage: product = (
    await axios.get("https://fakestoreapi.com/products/1")
  ).data;

  const responseWithouImage: product = {};
  Object.keys(responseWithImage).forEach((tag) => {
    if (tag !== "image") {
      responseWithouImage[tag] = responseWithImage[tag];
    }
  });

  storeTests.forEach((test, index) => {
    switch (index) {
      case 0:
        if (responseWithImage.image) {
          test.answer = "passed";
          test.description = "We can show the image";
        } else {
          test.answer = "failed";
          test.description =
            "We can't show the image, now we showing a empty state";
        }
        break;
      case 2:
        if (responseWithImage.price && responseWithImage.price >= 100) {
          test.answer = "passed";
          test.description = "We can show the price with red color";
        } else {
          test.answer = "failed";
          test.description =
            "We can't show the price with red color, now we showing the price with green color";
        }
        break;
    }
  });

  res.send(storeTests);
});

app.get("/users", async (req, res) => {
  const mockGetResponse = {
    dataUser: ["User1"],
    permission: false,
    status: {
      status: "ACTIVE",
      description: "NORMAL_USER",
    },
  };

  const mockPutResponse = {
    dataUser: ["User2"],
    permission: true,
    status: {
      status: "ACTIVE",
      description: "ADMIN_USER",
    },
  };

  const mockPostResponse = {
    dataUser: ["User3"],
    permission: null,
    status: {
      status: "NOT_FOUND",
      description: null,
    },
  };

  const mockDeleteResponse = {
    dataUser: ["User4"],
    permission: true,
    status: {
      status: "ACTIVE",
      description: "NORMAL_USER",
    },
  };

  userTests.forEach((test, index) => {
    switch (index) {
      /* GET TEST */
      case 0:
        if (mockGetResponse.status.status === "ACTIVE") {
          test.answer = "passed";
          test.description = "We can get this user";
        } else if (mockGetResponse.status) {
          switch (mockGetResponse.status.status) {
            case "DEACTIVE":
              test.answer = "failed";
              test.description =
                "We can't get this user, we going to show a disable user";
              break;
            case "NOT_FOUND":
              test.answer = "failed";
              test.description =
                "We can't get this user, we going to show a empty user state";
              break;
            case "TIME_LIMIT":
              test.answer = "failed";
              test.description =
                "We can't get this user, we going to show a retry button";
              break;
            default:
              test.answer = "failed";
              test.description =
                "We can't get this user, we going to show a default empty state error";
              break;
          }
        } else {
          test.answer = "failed";
          test.description =
            "We can't get this user, we going to show a response empty state error";
        }
        break;
      /* PUT TEST */
      case 1:
        if (
          mockPutResponse.status.status === "ACTIVE" &&
          mockPutResponse.status.description === "ADMIN_USER"
        ) {
          test.answer = "passed";
          test.description = "We can PUT this user";
        } else if (mockPutResponse.status) {
          switch (mockPutResponse.status.status) {
            case "ACTIVE":
              test.answer = "failed";
              test.description =
                "We can't edit this user because he is not admin, we going to show a disable edit user";
              break;
            case "DEACTIVE":
              test.answer = "failed";
              test.description =
                "We can't edit this user, we going to show a disable user";
              break;
            case "NOT_FOUND":
              test.answer = "failed";
              test.description =
                "We can't edit this user, we going to show a empty user state";
              break;
            case "TIME_LIMIT":
              test.answer = "failed";
              test.description =
                "We can't edit this user, we going to show a retry button";
              break;
            default:
              test.answer = "failed";
              test.description =
                "We can't edit this user, we going to show a default empty state error";
              break;
          }
        } else {
          test.answer = "failed";
          test.description =
            "We can't edit this user, we going to show a response empty state error";
        }
        break;
      /* POST TEST */
      case 2:
        if (
          mockPostResponse.status.status === "NOT_FOUND" ||
          mockPostResponse.status.status === "DEACTIVE"
        ) {
          test.answer = "passed";
          test.description = "We can POST this user";
        } else if (mockPostResponse.status) {
          switch (mockPostResponse.status.status) {
            case "ACTIVE":
              test.answer = "failed";
              test.description =
                "We can't create this user because it already exists, we going to show a exist user error";
              break;
            case "TIME_LIMIT":
              test.answer = "failed";
              test.description =
                "We can't create this user, we going to show a retry button";
              break;
            default:
              test.answer = "failed";
              test.description =
                "We can't create this user, we going to show a default empty state error";
              break;
          }
        } else {
          test.answer = "failed";
          test.description =
            "We can't create this user, we going to show a response empty state error";
        }
        break;
      /* DELETE TEST */
      case 3:
        if (mockDeleteResponse.status.status === "ACTIVE") {
          test.answer = "passed";
          test.description = "We can DELETE this user";
        } else if (mockDeleteResponse.status) {
          switch (mockDeleteResponse.status.status) {
            case "DEACTIVE":
              test.answer = "failed";
              test.description =
                "We can't delete this user, we going to show a disable user";
              break;
            case "NOT_FOUND":
              test.answer = "failed";
              test.description =
                "We can't delete this user, we going to show a empty user state";
              break;
            case "TIME_LIMIT":
              test.answer = "failed";
              test.description =
                "We can't delete this user, we going to show a retry button";
              break;
            default:
              test.answer = "failed";
              test.description =
                "We can't delete this user, we going to show a default empty state error";
              break;
          }
        } else {
          test.answer = "failed";
          test.description =
            "We can't delete this user, we going to show a response empty state error";
        }
        break;
    }
  });

  res.send(userTests);
});

app.listen(3333);
