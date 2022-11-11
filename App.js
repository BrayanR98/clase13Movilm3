import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View,TouchableOpacity,TextInput} from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios'; //consumidor de apis

export default function App()  {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [idSearch,setIdSearch] = useState('')
  const [nombre,setNombre] = useState('')
  const [apellidos,setApellidos] = useState('')
const PORT='192.168.1.4'


const saveCliente = async () => {
  if (!nombre.trim() || !apellidos.trim()) {
    alert("Nombre y usuario son obligatorios");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.post(`http://${PORT}:3000/api/clientes`, {
      nombre,
      apellidos,
    });
    alert("Cliente agregado correctamente ...")
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

const updateCliente = async (id) => {
  if (!nombre.trim() || !apellidos.trim()) {
    alert("Nombre y usuario son obligatorios");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.put(`http://${PORT}:3000/api/clientes/${id}`, {
      nombre,
      apellidos,
    });
    alert("Cliente actualizado correctamente ...")
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};
 const deleteCliente = async (id) => {
   if (!nombre.trim() || !apellidos.trim()) {
     alert("Nombre y usuario son obligatorios");
     return;
   }
   setLoading(true);
   try {
     const response = await axios.delete(`http://${PORT}:3000/api/clientes/${id}`, {
       nombre,
       apellidos,
     });
     alert("Cliente Eliminado correctamente ...")
   } catch (error) {
     console.log(error)
   }
   finally{
     setLoading(false);
   }
 };
const getClientes = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`http://${PORT}:3000/api/clientes`);
    setData(response.data);
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};
const getClientePorId = async (id) => {
  setLoading(true);
  try {
    const response = await axios.get(`http://${PORT}:3000/api/clientes/${id}`); 
    setData(response.data)
    if(response.data.nombre != null){
      //Actualizar los estados de nombre y apellidos
      setNombre(response.data.nombre)
      setApellidos(response.data.apellidos)
    }
    else{
      alert("Id del cliente no existe, por favor intente con otro")
    }
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};

  useEffect(() => {
   // getUsers(); //se ejecutara este metodo al iniciar ,por primera vez, el componente 
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
      style={[styles.touchables,{backgroundColor:'green'}]}
      onPress={()=>getClientes()}
      >
        <Text style={{color:'yellow'}}> listar clientes</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={[styles.touchables,{backgroundColor:'aquamarine'}]}
      onPress={()=> getClientePorId(idSearch)}
      >
        <Text style={{color:'red'}}> Buscar por id de cliente </Text>
      </TouchableOpacity>
      <TextInput 
      style={styles.inputs}
      placeholder="Ingrese el id de cliente"
      onChangeText={idSearch => setIdSearch(idSearch) }
      value={idSearch}
      />
      <TextInput 
      style={styles.inputs}
      onChangeText={nombre => setNombre(nombre) }
      value={nombre}
      />
      <TextInput 
      style={styles.inputs}
      onChangeText={apellidos => setApellidos(apellidos) }
      value={apellidos}
      />
      <TouchableOpacity
      style={[styles.touchables,{backgroundColor:'green'}]}
      onPress={()=>saveCliente()}
      >
        <Text style={{color:'yellow'}}> Guardar clientes</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={[styles.touchables,{backgroundColor:'green'}]}
      onPress={()=>updateCliente(idSearch)}
      >
        <Text style={{color:'yellow'}}> Actualizar Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={[styles.touchables,{backgroundColor:'green'}]}
      onPress={()=>deleteCliente(idSearch)}
      >
        <Text style={{color:'yellow'}}> Eliminar Cliente</Text>
      </TouchableOpacity>
      

      
      {isLoading ? <ActivityIndicator size='large' color='red' /> : (
        <FlatList
          data={data}
          //keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
           <TouchableOpacity
           style={[styles.touchables,{backgroundColor:'orange'}]}
            onPress = {()=>{
              //alert(`correo ${item.email}, usuarion: ${item.username}`)
              if (confirm(`Está seguro de borrar al cliente: ${item.nombre}?`)){
                alert('Cliente borrado con exito...')
              }
            }
            }>
            <Text style={{color:'white',fontWeight:'bold'}}>{item.nombre} {item.apellido}</Text>
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
