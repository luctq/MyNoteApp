import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Folder from '../screens/Folder'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Note from '../screens/Note'
import RecycleBin from '../screens/RecycleBin'
import Register from '../screens/Register'
import Settings from '../screens/Settings'
import TodoList from '../screens/TodoList'
import Draw from '../screens/Draw'

const Stack = createNativeStackNavigator()

function Router () {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Home'
          component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='Login'
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='Register'
          component={Register}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='Folder'
          component={Folder}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='RecycleBin'
          component={RecycleBin}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='Settings'
          component={Settings}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='Note'
          component={Note}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name='TodoList'
          component={TodoList}
        />
        <Stack.Screen 
          name='Draw'
          component={Draw}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router