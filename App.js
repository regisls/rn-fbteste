import firebase from 'firebase';
import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {pontuacao: 0};

    var firebaseConfig = {
      apiKey: 'AIzaSyBxxcuBhbghFnoWLKqav0Y2zgJF4eXKJRo',
      authDomain: 'configuracaofirebasereac-10285.firebaseapp.com',
      databaseURL: 'https://configuracaofirebasereac-10285.firebaseio.com',
      projectId: 'configuracaofirebasereac-10285',
      storageBucket: 'configuracaofirebasereac-10285.appspot.com',
      messagingSenderId: '56577068558',
      appId: '1:56577068558:web:e18964976e52ee7940765f',
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  // componentWillMount() {
  //   var firebaseConfig = {
  //     apiKey: "AIzaSyBxxcuBhbghFnoWLKqav0Y2zgJF4eXKJRo",
  //     authDomain: "configuracaofirebasereac-10285.firebaseapp.com",
  //     databaseURL: "https://configuracaofirebasereac-10285.firebaseio.com",
  //     projectId: "configuracaofirebasereac-10285",
  //     storageBucket: "configuracaofirebasereac-10285.appspot.com",
  //     messagingSenderId: "56577068558",
  //     appId: "1:56577068558:web:e18964976e52ee7940765f"
  //   };
  //   // Initialize Firebase
  //   firebase.initializeApp(firebaseConfig);
  // }

  salvarDados() {
    //var database = firebase.database();
    //database.ref("pontuacao").set("200");
    //database.ref("pontuacao").remove();

    // Referenciando o nó funcionarios
    var funcionarios = firebase.database().ref('funcionarios');
    //funcionarios.remove();

    // O push() cria um ID único para cada novo registro
    //funcionarios.push().child("nome").set("Regis");

    // Usando objetos literais
    funcionarios.push().set({
      nome: 'Regis Sebastiani',
      altura: '1,82',
    });
  }

  listarDados() {
    var pontuacao = firebase.database().ref('pontuacao');
    pontuacao.on('value', (snapshot) => {
      var pontos = snapshot.val();
      this.setState({pontuacao: pontos});
    });
  }

  cadastrarUsuario() {
    var email = 'regisls@gmail.com';
    var senha = '123456';

    const usuario = firebase.auth();
    usuario.createUserWithEmailAndPassword(email, senha).catch((erro) => {
      alert(erro.message)
      //erro.code
      //erro.message
    });
  }

  verificarUsuario() {
    const usuario = firebase.auth();

    /*
    const usuarioAtual = usuario.currentUser;

    if (usuarioAtual) {
      alert('Usuário está logado');
    } else {
      alert('Usuário não está logado');
    }
    */

    usuario.onAuthStateChanged((usuarioAtual) => {
      if (usuarioAtual) {
        alert('Usuário está logado');
      } else {
        alert('Usuário não está logado');
      }
    });
  }

  logout() {
    const usuario = firebase.auth();
    usuario.signOut();
  }

  login() {
    var email = 'regisls@gmail.com';
    var senha = '123456';

    const usuario = firebase.auth();
    usuario.signInWithEmailAndPassword(email, senha).catch((erro) => {
      alert(erro.message);
    });
  }

  render() {
    let {pontuacao} = this.state;

    return (
      <View>
        <Button
          onPress={() => {
            this.salvarDados();
          }}
          title="Salvar dados"
          color="#841584"
          accessibilityLabel="Salvar dados"
        />

        <Button
          onPress={() => {
            this.listarDados();
          }}
          title="Listar dados"
          color="#841584"
          accessibilityLabel="Listar dados"
        />

        <Button
          onPress={() => {
            this.cadastrarUsuario();
          }}
          title="Cadastrar usuário"
          color="#841584"
          accessibilityLabel="Cadastrar usuário"
        />

        <Button
          onPress={() => {
            this.verificarUsuario();
          }}
          title="Verificar usuário"
          color="#841584"
          accessibilityLabel="Verificar usuário"
        />

        <Button
          onPress={() => {
            this.logout();
          }}
          title="Logout"
          color="#841584"
          accessibilityLabel="Logout"
        />

        <Button
          onPress={() => {
            this.login();
          }}
          title="Login"
          color="#841584"
          accessibilityLabel="Login"
        />

        <Text>{pontuacao}</Text>
      </View>
    );
  }
}

export default App;
