import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import axios from 'axios';
import NotificationListing from './NotificationListing';

const Notifications = ({ route, navigation }) => {
  const { username, spaces, reportedCookie, notifsCount, setNotifsCount, reportedPosts, viewedCookieCount, setViewedCookieCount } = route.params;
  // const [reports, setReports] = React.useState([]);

  // React.useEffect(() => {
  //   let reportArray = reports.slice();
  //   console.log('spaces', spaces);

  //   spaces.map(async (space) => {
  //     await axios.get(`http://ec2-52-33-56-56.us-west-2.compute.amazonaws.com:3000/confessions?space_name=${space}&reported=true`)
  //       .then(({ data }) => {
  //         if (data[0]) {
  //           reportArray = reports.slice();
  //           reportArray.push(data[0]);

  //           setReports(reportArray);
  //           setUnreadNofits(reportArray.length);
  //           console.log('reportArray within notif useeffect', data[0]);
  //         }
  //       })
  //       .catch((err) => console.log('axios error in notifications', err));
  //   });
  // }, [route]);

  if (reportedPosts.length === 0) {
    return <Text style={{ alignSelf: 'center', padding: 20 }}>You are all caught up!</Text>;
  }

  return (
    <SafeAreaView>
      <View style={{ padding: 10 }}>
        {
          reportedPosts.map((confession) => {
            if (!confession) return;

            console.log('confession', confession);

            if (confession.reported.length > 0) {
              if (reportedCookie) {
                for (let i = 0; i < reportedCookie.length; i += 1) {
                  console.log('reported cookie', reportedCookie[i]);
                  if (reportedCookie[i].reportedUser === confession.created_by &&
                    reportedCookie[i].confessionId === confession.confession_id &&
                    !reportedCookie[i].commentId) {
                    console.log('found banned confession');
                    return;
                  }
                }
              }

              return (
                <NotificationListing
                  username={username}
                  key={confession.confession_id}
                  navigation={navigation}
                  reported={confession.created_by}
                  reportedBy={confession.reported[0]}
                  spaceName={confession.space_name}
                  confessionId={confession.confession_id}
                  reportedCookie={reportedCookie}
                  notifsCount={notifsCount}
                  setNotifsCount={setNotifsCount}
                />
              );
            }
            if (confession.comments.length > 0) {
              confession.comments.map((comment) => {
                if (reportedCookie) {
                  for (let i = 0; i < reportedCookie.length; i += 1) {
                    if (reportedCookie[i].reportedUser === comment.created_by &&
                      reportedCookie[i].confessionId === confession.confession_id &&
                      reportedCookie[i].commentId === comment.comment_id) {
                      console.log('found banned comment');
                      return;
                    }
                  }
                }

                return (
                  <NotificationListing
                    username={username}
                    key={comment.comment_id}
                    navigation={navigation}
                    reported={comment.created_by}
                    reportedBy={comment.reported[0]}
                    spaceName={confession.space_name}
                    commentId={comment.comment_id}
                    confessionId={confession.confession_id}
                    reportedCookie={reportedCookie}
                    notifsCount={notifsCount}
                    setNotifsCount={setNotifsCount}
                  />
                );
              });
            }
          })
        }
      </View>
    </SafeAreaView>
  );
};

export default Notifications;