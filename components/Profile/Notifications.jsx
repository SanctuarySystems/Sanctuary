import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorTheme } from './colorTheme';
import NotificationListing from './NotificationListing';

const Notifications = ({ route, navigation }) => {
  const {
    username,
    reportedCookie,
    notifsCount,
    setNotifsCount,
    reportedPosts,
    viewedCookieCount,
    setViewedCookieCount,
  } = route.params;

  React.useEffect(() => {
    updateCookies(reportedPosts);
    setViewedCookieCount(reportedPosts.length);
  }, []);

  if (reportedPosts.length === 0) {
    return <Text style={styles.emptyState}>You are all caught up!</Text>;
  }

  return (
    <SafeAreaView>
      <View style={styles.notificationsView}>
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
                  viewedCookieCount={viewedCookieCount}
                  setViewedCookieCount={setViewedCookieCount}
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
                    viewedCookieCount={viewedCookieCount}
                    setViewedCookieCount={setViewedCookieCount}
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
    backgroundColor: `${colorTheme.beige}`,
    height: '100%',
  },
});

export default Notifications;