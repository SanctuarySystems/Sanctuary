import React from 'react';
import { View } from 'react-native';
import axios from 'axios';
import NotificationListing from './NotificationListing';

const Notifications = ({ route, navigation }) => {
  const { spaces } = route.params;
  const [reported, setReported] = React.useState([]);

  React.useEffect(() => {
    const reports = [];

    spaces.map(async (space) => {
      await axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?space_name=tranquility&reported=true`)
        .then(({ data }) => {
          console.log(data[0]) || reports.push(data[0])
          setReported(reports);
        })
        .catch((err) => console.log('axios error in notifications', err));
    });


  }, [route]);

  // {"__v": 4,
  // "_id": "63c709355b387cef7dae4143",
  // "comments": [{
  //   "_id": "63c7093a5b387cef7dae4147",
  //   "comment": "the very first comment",
  //   "comment_id": 1,
  //   "createdAt": "2023-01-17T20:46:51.003Z",
  //   "created_by": "lookingforpeace",
  //   "pops": 2,
  //   "reported": [Array],
  //   "updatedAt": "2023-01-18T18:42:27.896Z"
  // }],
  // "confession": "my innermost darkest secret revealed here...",
  // "confession_id": 1,
  // "createdAt": "2023-01-17T20:46:45.511Z",
  // "created_by": "lookingforpeace",
  // "hugs": 0,
  // "reported": ["lookingforcalm"],
  // "space_name": "tranquility",
  //   "updatedAt": "2023-01-18T18:42:27.896Z"}


  return (
    <View style={{ padding: 10 }}>
      {
        reported.map((confession) => {
          if (confession.reported.length > 0) {
            return (
              <NotificationListing
                navigation={navigation}
                reported={confession.created_By}
                reportedBy={confession.reported[0]}
                spaceName={confession.space_name}
                confessionId={confession.confession_id}
              />
            );
          }
          if (confession.comments.length > 0) {
            confession.comments.map((comment) => {
              return (
                <NotificationListing
                  navigation={navigation}
                  reported={comment.created_By}
                  reportedBy={comment.reported[0]}
                  spaceName={confession.space_name}
                  commentId={comment.comment_id}
                  confessionId={confession.confession_id}
                />
              );
            });
          }
        })
      }
    </View>
  );
};

export default Notifications;