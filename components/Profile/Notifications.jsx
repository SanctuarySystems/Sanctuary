import React from 'react';
import { View } from 'react-native';
import axios from 'axios';
import NotificationListing from './NotificationListing';

const Notifications = ({ route, navigation }) => {
  const { spaces, reportedCookie, unreadNotifs, setUnreadNofits } = route.params;
  const [reports, setReports] = React.useState([]);

  React.useEffect(() => {
    const reportArray = [];

    spaces.map(async (space) => {
      await axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?space_name=${space}&reported=true`)
        .then(({ data }) => {
          reportArray.push(data[0]);
          setReports(reportArray);
          console.log(data[0]);
        })
        .catch((err) => console.log('axios error in notifications', err));
    });
  }, [route]);

  if (reports.length === 0) return;

  return (
    <View style={{ padding: 10 }}>
      {
        reports.map((confession) => {

          if (!confession) return;

          console.log('confession', confession);

          if (confession.reported.length > 0) {
            if (reportedCookie._z) {
              for (let i = 0; i < reportedCookie._z.length; i++) {
                console.log('reported cookie', reportedCookie._z[i]);
                if (reportedCookie._z[i].reportedUser === confession.created_by &&
                  reportedCookie._z[i].confessionId === confession.confession_id &&
                  !reportedCookie._z[i].commentId) {
                    console.log('found banned confession');
                    return;
                  }
              }
            }

            return (
              <NotificationListing
                navigation={navigation}
                reported={confession.created_by}
                reportedBy={confession.reported[0]}
                spaceName={confession.space_name}
                confessionId={confession.confession_id}
                reportedCookie={reportedCookie}
                unreadNotifs={unreadNotifs}
                setUnreadNofits={setUnreadNofits}
              />
            );
          }
          if (confession.comments.length > 0) {
            confession.comments.map((comment) => {
              if (reportedCookie._z) {
                for (let i = 0; i < reportedCookie._z.length; i++) {
                  if (reportedCookie._z[i].reportedUser === comment.created_by &&
                    reportedCookie._z[i].confessionId === confession.confession_id &&
                    reportedCookie._z[i].commentId === comment.comment_id) {
                      console.log('found banned comment');
                      return;
                    }
                }
              }

              return (
                <NotificationListing
                  navigation={navigation}
                  reported={comment.created_by}
                  reportedBy={comment.reported[0]}
                  spaceName={confession.space_name}
                  commentId={comment.comment_id}
                  confessionId={confession.confession_id}
                  reportedCookie={reportedCookie}
                  unreadNotifs={unreadNotifs}
                  setUnreadNofits={setUnreadNofits}
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