import githubLogo from '../assets/github.png';
import { Container } from './styles';
import Input from '../components/input'
import Button from '../components/button';
import ItemRepo from '../components/itemRepo'
import { useState } from 'react';
import {api} from '../services/api';

const App = () => {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)
    
    if(data.id) {

      const isExist = repos.find(repo => repo.id === data.id);

      if(!isExist) {

          setRepos(prev => [...prev, data]);
          setCurrentRepo('');
          return;
        
      }

    } else {
      alert('Repositório não encontrado');
    }
  }

  const handleRemoveRepo = (id) => {
    repos.filter((repo, i) => {
      if(repo.id === id) {
        setRepos(prev => prev.splice(i, 1))
      }
    })
  }

  return (
    <Container>
      <img src={githubLogo} width={72} height={72}></img>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}></Input>
      <Button onClick={handleSearchRepo}></Button>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}></ItemRepo>)}
    </Container>
  );
}

export default App;
