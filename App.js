import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,TouchableOpacity,TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
export default function App()  {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idSearch,setIdSearch] = useState('')
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')

  const getUsers = async () => {
     try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const getUserById = async (id) => {
    try {
     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
     const json = await response.json();
     setData(json);
     if (json.name != null){
      setName(json.name)
      setEmail(json.email)
     }else{
      alert("El id del usuario no existe... intentelo con otro")
     }
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

  useEffect(() => {
   // getUsers(); //se ejecutara este metodo al iniciar ,por primera vez, el componente 
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
      style={[styles.touchables,{backgroundColor:'green'}]}
      onPress={()=>getUsers()}
      >
        <Text style={{color:'yellow'}}> listar usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={[styles.touchables,{backgroundColor:'aquamarine'}]}
      onPress={()=> getUserById(idSearch)}
      >
        <Text style={{color:'red'}}> Buscar por id </Text>
      </TouchableOpacity>
      <TextInput 
      style={styles.inputs}
      placeholder="Ingrese el id de usuario"
      onChangeText={idSearch => setIdSearch(idSearch) }
      value={idSearch}
      />
      <TextInput 
      style={styles.inputs}
      onChangeText={name => setName(name) }
      value={name}
      />
      <TextInput 
      style={styles.inputs}
      onChangeText={email => setEmail(email) }
      value={email}
      />

      

      
      {isLoading ? <ActivityIndicator size='large' color='red' /> : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
           <TouchableOpacity
           style={[styles.touchables,{backgroundColor:item.id % 2 == 1?'orange':'gray'}]}
            onPress = {()=>{
              //alert(`correo ${item.email}, usuarion: ${item.username}`)
              if (confirm(`Está seguro de borrar al usuario: ${item.name}?`)){
                alert('Usuario borrado con exito...')
              }
            }
            }>
            <Text style={{color:'white',fontWeight:'bold'}}>{item.name}</Text>
           </TouchableOpacity> 
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchables:{
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    height:50,
    margin:5
  },
  inputs:{
    borderRadius:10,
    borderColor:'green',
    borderWidth:1,
    marginTop:10,
    textAlign:'cente',
    padding:5
  }
});
