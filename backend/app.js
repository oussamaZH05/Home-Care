//-------------Module Importation---------------//

//import express module
const express = require("express");
//import body-parser module
const bodyParser = require("body-parser");
//import mongoose module
const mongoose = require("mongoose");
//connect app to Data Base "careGiverDB"
mongoose.connect("mongodb://127.0.0.1:27017/careGiverDB");
//import Bcrypt module
const bcrypt = require("bcrypt");
//import multer module
const multer = require("multer");
//import path module
const path = require("path");
//import axios module
// const axios = require("axios");
//import request module
// const request = require("request");
// import ObjectID
const { ObjectId } = require("mongodb");

//-------------Express Application------------//

//create express application
const app = express();

//-------------Models Importation------------//
const User = require("./models/user");

const ClientPost = require("./models/clientPost");

const Request = require("./models/request");
//send JSON response
app.use(bodyParser.json());
//Get objects from Request
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
// Image folder configuration
app.use("/images", express.static(path.join("backend/images")));
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};
const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    let path = "backend/images";
    if (isValid) {
      error = null;
      if (MIME_TYPE[file.mimetype] == "pdf") {
        path = "backend/docs";
      }
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});

//----------------Business Logic----------------//
//-------------------------------------------------------------USERS
// Business Logic: Signup
app.post(
  "/users/signup",
  multer({ storage: storageConfig }).fields([
    { name: "cv", maxCount: 1 },
    { name: "img", maxCount: 8 },
  ]),
  (req, res) => {
    console.log("Here into BL : Add User", req.body);
    const url = req.protocol + "://" + req.get("host");
    let avatar = "";
    if (req.files.img) {
      avatar = url + "/images/" + req.files.img[0].filename;
    } else {
      avatar = url + "/images/" + "default-avatar.png";
    }

    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
      console.log("here crypted PWD", cryptedPwd);
      let user;
      if (req.body.role == "nurse") {
        user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          experience: req.body.experience,
          phone: req.body.phone,
          address: req.body.address,
          email: req.body.email,
          password: cryptedPwd,
          role: req.body.role,
          status: req.body.status,
          gender: req.body.gender,
          cv: url + "/docs/" + req.files.cv[0].filename,
          avatar: avatar,
        });
      } else if (req.body.role == "client") {
        user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,

          phone: req.body.phone,
          address: req.body.address,
          email: req.body.email,
          password: cryptedPwd,
          role: req.body.role,
          status: req.body.status,
          gender: req.body.gender,
          avatar: avatar,
        });
      } else {
        user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,

          phone: req.body.phone,
          address: req.body.address,
          email: req.body.email,
          password: cryptedPwd,
          role: req.body.role,

          gender: req.body.gender,
          avatar: avatar,
        });
      }

      user.save((error, doc) => {
        console.log("here error", error);
        console.log("here doc", doc);
        if (error) {
          if (error.errors.email) {
            res.json({ message: "email exist", isAdded: false });
          } else if (error.errors.phone) {
            res.json({ message: "phone exist", isAdded: false });
          }
        } else {
          res.json({ message: "Added with success", isAdded: true });
        }
      });
    });
  }
);

// Business Logic: Login
app.post("/users/login", (req, res) => {
  let user;
  console.log("here login body", req.body);

  User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] })
    .then((doc) => {
      console.log("here searched user by email or phone", doc);

      if (!doc) {
        res.json({ message: "0" });
      }
      user = doc;
      return bcrypt.compare(req.body.password, doc.password);
    })
    .then((passwordResponse) => {
      console.log("here passwordResponse", passwordResponse);
      if (!passwordResponse) {
        res.json({ message: "1" });
      } else {
        let userToSend = {
          id: user._id,
          fName: user.firstName,
          lName: user.lastName,
          role: user.role,
        };
        res.json({ user: userToSend, message: "2" });
      }
    });
});

// Business Logic: Get all Users
app.get("/users/allUsers", (req, res) => {
  console.log("here into find all users");
  User.find({}).then((docs) => {
    res.json({ usersTab: docs });
  });
});
// Business Logic: Get all nurses
app.get("/users/nurses", (req, res) => {
  User.find({ role: "nurse", status: "Confirmed" }).then((docs) => {
    res.json({ nursesTab: docs });
  });
});

//Business logic : Get User By Id
app.get("/users/:id", (req, res) => {
  console.log("Here into BL : Get User By Id");
  let id = req.params.id;
  User.findOne({ _id: id }).then((doc) => {
    console.log(("here doc", doc));
    doc ? res.json({ user: doc }) : res.json({ message: "user doesn't exist" });
  });
});

// Business Logic: Edit User
app.put("/users", (req, res) => {
  console.log("Here into BL : Edit user");
  let newUser = req.body;
  console.log("here new user", newUser);
  User.updateOne({ _id: newUser._id }, newUser).then((response) => {
    console.log("here response after update", response);
    if (response.modifiedCount == 1) {
      res.json({ message: `User "${newUser.firstName}" :Edited With Success` });
    } else {
      res.json({ message: `not Edited ` });
    }
  });
});

// Business Logic: search nurses
app.post("/users/search/nurses", (req, res) => {
  let searchObj = req.body;
  console.log(searchObj);
  User.find({
    role: "nurse",
    status: "Confirmed",
    $or: [
      { address: searchObj.address },
      {
        experience: {
          $gte: searchObj.experienceMin,
          $lte: searchObj.experienceMax,
        },
      },
    ],
  }).then((docs) => {
    res.json({ searchTab: docs });
  });
});

// Business Logic: Confirm User Status
app.put("/users/user/confirm", (req, res) => {
  console.log("Here into BL : Confirm user Status");
  let userId = req.body;
  console.log("here new userId", userId);
  User.updateOne(
    { _id: ObjectId(userId.userId) },
    {
      $set: {
        status: "Confirmed",
      },
    }
  ).then((response) => {
    console.log("here response after update", response);
    if (response.modifiedCount == 1) {
      res.json({ message: `User :Edited With Success` });
    } else {
      res.json({ message: `not Edited ` });
    }
  });
});
//Business logic : Delete User By Id
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  console.log("here into BL: delete User By Id", id);
  User.deleteOne({ _id: id }).then((Response) => {
    console.log("here response", Response);
    if (Response.deletedCount == 1) {
      res.json({ isDeleted: true });
    } else {
      res.json({ isDeleted: false });
    }
  });
});
//-------------------------------------------------------------Client Posts
//Business logic : add Post
app.post("/clientPost", (req, res) => {
  console.log("here into add post", req.body);
  console.log("here date", req.body.date);
  let post = new ClientPost({
    title: req.body.title,
    description: req.body.description,
    userId: ObjectId(req.body.userId),
    status: req.body.status,
    date: req.body.date,
  });
  post.save((err, doc) => {
    if (!err) {
      res.json({ message: "your post is added with success" });
    }
  });
});

//Business logic : Get Post By Id
app.get("/clientPost/:id", (req, res) => {
  console.log("Here into BL : Get post By Id");
  let id = req.params.id;
  ClientPost.findOne({ _id: id }).then((doc) => {
    console.log(("here doc", doc));
    doc
      ? res.json({ ClientPost: doc })
      : res.json({ message: "Post doesn't exist" });
  });
});

// Business Logic: Edit Post
app.put("/clientPost", (req, res) => {
  console.log("Here into BL : Edit Post");
  let newPost = req.body;
  console.log("here new Post", newPost);
  ClientPost.updateOne({ _id: newPost._id }, newPost).then((response) => {
    console.log("here response after update", response);
    if (response.modifiedCount == 1) {
      res.json({ message: `Post Edited With Success` });
    } else {
      res.json({ message: `not Edited ` });
    }
  });
});

// Business Logic: Get all posts
app.get("/clientPost/posts/all", (req, res) => {
  console.log("here into BL : get all posts");
  ClientPost.find().then((docs) => {
    res.json({ postsTab: docs });
  });
});

// Business Logic: Get all posts for connected User
app.post("/clientPost/posts/user", (req, res) => {
  console.log("here into my posts search");
  console.log("here id", req.body);
  ClientPost.find({ userId: req.body.id }).then((docs) => {
    console.log(docs);
    res.json({ myPostsTab: docs });
  });
});

// Business Logic: Get all posts with their authors

app.get("/clientPost/allPosts/authors", (req, res) => {
  console.log("here into get posts with their authors");
  ClientPost.aggregate(
    [
      { $match: { status: "Confirmed", status: "reserved" } },
      {
        $lookup: {
          from: "users", // collection to join
          localField: "userId", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "author", // output array field
        },
      },
    ],
    (error, docs) => {
      console.log("here docs", docs);
      res.status(200).json({
        posts: docs,
      });
    }
  );
});
//Business logic : Delete all Post of one User
app.delete("/clientPost/allPosts/delete/:id", (req, res) => {
  let id = req.params.id;
  console.log("here into BL: delete all Posts of one User", id);
  ClientPost.deleteMany({ userId: ObjectId(id) }).then((Response) => {
    console.log("here response", Response);
    if (Response.deletedCount >= 1) {
      res.json({ isDeleted: true });
    } else {
      res.json({ isDeleted: false });
    }
  });
});

// Business Logic: Confirm Post Status
app.put("/clientPost/post/confirm", (req, res) => {
  console.log("Here into BL : Confirm post Status");
  let postId = req.body;
  console.log("here new postId", postId);
  ClientPost.updateOne(
    { _id: ObjectId(postId.postId) },
    {
      $set: {
        status: "Confirmed",
      },
    }
  ).then((response) => {
    console.log("here response after update", response);
    if (response.modifiedCount == 1) {
      res.json({ message: `Post :Confirmed With Success` });
    } else {
      res.json({ message: `Post is not Confirmed ` });
    }
  });
});
//Business logic : Delete User By Id
app.delete("/clientPost/:id", (req, res) => {
  let id = req.params.id;
  console.log("here into BL: delete Post By Id", id);
  ClientPost.deleteOne({ _id: id }).then((Response) => {
    console.log("here response", Response);
    if (Response.deletedCount == 1) {
      res.json({ isDeleted: true });
    } else {
      res.json({ isDeleted: false });
    }
  });
});
//-------------------------------------------------------------Nurse Requests
// Business Logic: Get all connected nurse sent requests with clients info

app.post("/requests/myRequests/clients", (req, res) => {
  let nurseId = req.body.id;

  console.log("here into get nurse sent requests with clients info");
  ClientPost.aggregate(
    [
      { $match: { $expr: { $eq: [`$nurseId`, { $toObjectId: nurseId }] } } },
      {
        $lookup: {
          from: "users", // collection to join
          localField: "userId", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "clients", // output array field
        },
      },
    ],
    (error, docs) => {
      console.log("here docs", docs);
      res.status(200).json({
        sentRequests: docs,
      });
    }
  );
});
//Business logic : add Request
app.post("/requests/sendRequests", (req, res) => {
  console.log("here into add request", req.body);

  let request = new Request({
    nurseId: req.body.nurseId,
    clientId: req.body.userId,
    status: req.body.status,
    date: req.body.date,
  });
  request.save((err, doc) => {
    if (!err) {
      res.json({ message: "your request is added with success" });
    }
  });
});

// Business Logic: Get all connected nurse received requests with clients info

app.post("/requests/myRequests/received", (req, res) => {
  let nurseId = req.body.id;

  console.log("here into get nurse received requests with clients info");
  Request.aggregate(
    [
      { $match: { $expr: { $eq: [`$nurseId`, { $toObjectId: nurseId }] } } },
      {
        $lookup: {
          from: "users", // collection to join
          localField: "clientId", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "clients", // output array field
        },
      },
    ],
    (error, docs) => {
      console.log("here docs", docs);
      res.status(200).json({
        receivedRequests: docs,
      });
    }
  );
});

// Business Logic: Change the Status of sent request
app.put("/requests/myRequests/sent", (req, res) => {
  console.log("Here into BL : change request Status");
  console.log("here obj", req.body);
  let status = req.body.status;
  let requestId = req.body.id;
  Request.updateOne(
    { _id: ObjectId(requestId) },
    {
      $set: {
        status: status,
      },
    }
  ).then((response) => {
    console.log("here response after update", response);
    if (response.modifiedCount == 1) {
      res.json({ message: `Request status :Edited With Success` });
    } else {
      res.json({ message: `Request status : not Edited ` });
    }
  });
});

// Business Logic: Get all sent requests with clients info and nurses Info
app.get("/requests/getAllRequests", (req, res) => {
  console.log(
    "here into get all sent requests with clients info and nurse Info"
  );
  Request.aggregate(
    [
      {
        $lookup: {
          from: "users", // collection to join
          localField: "nurseId", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "nurses", // output array field
        },
      },
      {
        $lookup: {
          from: "users", // collection to join
          localField: "clientId", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "clients", // output array field
        },
      },
    ],
    (error, docs) => {
      console.log("here docs", docs);
      res.status(200).json({
        requestsTab: docs,
      });
    }
  );
});

// Business Logic: Get all ACCEPTED Jobs Offers with clients info and nurses Info
app.get("/requests/acceptedOffers", (req, res) => {
  console.log(
    "here into get all all ACCEPTED Jobs Offers with clients info and nurses Info"
  );
  ClientPost.aggregate(
    [
      { $match: { status: "reserved" } },
      {
        $lookup: {
          from: "users", // collection to join
          localField: "nurseId", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "nurses", // output array field
        },
      },
      {
        $lookup: {
          from: "users", // collection to join
          localField: "userId", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "clients", // output array field
        },
      },
    ],
    (error, docs) => {
      console.log("here docs", docs);
      res.status(200).json({
        acceptedJobsTab: docs,
      });
    }
  );
});

// Business Logic: Get all sent requests of the connected Client (in dashboard client)
app.post("/requests/requests/user", (req, res) => {
  console.log("here into my sent requests search");
  Request.aggregate(
    [
      {
        $match: { $expr: { $eq: [`$clientId`, { $toObjectId: req.body.id }] } },
      },
      {
        $lookup: {
          from: "users", // collection to join
          localField: "nurseId", //field from the input documents
          foreignField: "_id", //field from the documents of the "from" collection
          as: "nurse", // output array field
        },
      },
    ],
    (error, docs) => {
      console.log("here docs", docs);
      res.status(200).json({
        myRequestsTab: docs,
      });
    }
  );
});
//---------------App Exportation---------------//

// make app importable from another files
module.exports = app;
