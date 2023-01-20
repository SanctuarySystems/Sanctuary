import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationListing from './NotificationListing';

const Notifications = ({ route, navigation }) => {
  const { username, reportedCookie, notifsCount, setNotifsCount, reportedPosts,
    viewedCookieCount, setViewedCookieCount } = route.params;

  React.useEffect(() => {
    updateCookies(reportedPosts);
    console.log('set cookies for viewed notif count');

    const getCookieCount = async () => {
      try {
        const count = await AsyncStorage.getItem('viewedCount');
        console.log('getting cookie count in notifs', count);
      } catch (e) {
        console.log(e);
      }
    };

    setViewedCookieCount(reportedPosts.length);

    getCookieCount();
  }, []);

  if (reportedPosts.length === 0) {
    return <Text style={{ alignSelf: 'center', padding: 20 }}>You are all caught up!</Text>;
  }

  return (
    <SafeAreaView>
      <View style={{ padding: 15, backgroundColor: `${colorTheme.beige}`, height: '100%' }}>
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

export default Notifications;

const updateCookies = async (reportedPosts) => {
  try {
    await AsyncStorage.setItem('viewedCount', reportedPosts.length.toString());
    console.log('set cookie to reportedPosts.length.toString()', reportedPosts.length.toString());
  } catch (e) {
    console.log(e);
  }
};

const colorTheme = {
  beige: '#FEF1E6',
  yellow: '#F9D5A7',
  orange: '#FFB085',
  blue: '#90AACB',
};