import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorTheme } from './colorTheme';
import NotificationListing from './NotificationListing';

const Notifications = ({ route, navigation }) => {
  const {
    username,
    reportedCookie,
    notifsNum,
    setNofitsRead,
    reportedPosts,
  } = route.params;

  const reportedConfessions = [];

  React.useEffect(() => {
    setNofitsRead(notifsNum);
    updateCookies(reportedPosts);
  }, []);

  if (reportedPosts.length === 0) {
    return <Text style={styles.emptyState}>You are all caught up!</Text>;
  }

  return (
    <SafeAreaView>
      <View style={styles.notificationsView}>
        {
          reportedPosts.map((confession) => {
            if (confession.reported.length > 0) {
              console.log('reported conf found', confession);
              // if (reportedCookie) {
              //   for (let i = 0; i < reportedCookie.length; i += 1) {
              //     if (reportedCookie[i].reportedUser === confession.created_by
              //       && reportedCookie[i].confessionId === confession.confession_id
              //       && !reportedCookie[i].commentId) {
              //       return;
              //     }
              //   }
              // }

              if (confession.comments.length > 0) {
                reportedConfessions.push(confession.confession_id);
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
                />
              );
            }
          })
        }
        { reportedConfessions.length > 0
          && reportedPosts.map((confession) => {
            if (reportedConfessions.indexOf(confession.confession_id) > -1) {
              console.log('reported comments found');
              return confession.comments.map((comment) => {
                // if (reportedCookie) {
                //   for (let i = 0; i < reportedCookie.length; i += 1) {
                //     if (reportedCookie[i].reportedUser === comment.created_by
                //       && reportedCookie[i].confessionId === confession.confession_id
                //       && reportedCookie[i].commentId === comment.comment_id) {
                //       return;
                //     }
                //   }
                // }

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
                  />
                );
              });
            }
          })}
      </View>
    </SafeAreaView>
  );
};

const updateCookies = async (reportedPosts) => {
  try {
    await AsyncStorage.setItem('viewedCount', reportedPosts.length.toString());
  } catch (e) {
    console.log('updating cookie error: ', e);
  }
};

const styles = StyleSheet.create({
  emptyState: {
    alignSelf: 'center',
    padding: 20,
  },
  notificationsView: {
    padding: 15,
    backgroundColor: colorTheme.beige,
    height: '100%',
  },
});

export default Notifications;