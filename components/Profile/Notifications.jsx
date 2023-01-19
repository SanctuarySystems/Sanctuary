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
      await axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?space_name=${space}&reported=true`)
        .then(({ data }) => {
          reports.push(data[0]);
          setReported(reports);
        })
        .catch((err) => console.log('axios error in notifications', err));
    });
  }, [route]);

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