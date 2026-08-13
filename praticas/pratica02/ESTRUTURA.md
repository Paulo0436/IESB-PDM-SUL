# Explicando cada arquivo do meu projeto todo-basico
## package.json
- Funciona como um manifesto do projeto, contendo informações
sobre o projeto, suas dependências, scripts, metadados e outras
configurações
## package-lock.json
- O arquivo package-lock.json é um arquivo gerado automaticamente
pelo npm (Node Package Manager) quando você instala ou atualiza
pacotes em um projeto Node.js.
 Ele serve como um bloqueio de versão das dependências, garantindo
que todos os desenvolvedores do projeto utilizem exatamente as
mesmas versões dos pacotes instalados.
## index.js
- É o ponto de entrada principal de muitos projetos em Node.js e
aplicações JavaScript.
 Em algun casos, contém o código que inicializa o programa,
configura servidores, importa módulos e gerencia a lógica principal
da aplicação.
## app.json
- É um arquivo de configuração utilizado principalmente em
plataformas de deploy e automação, como Heroku, Expo (React
Native) e algumas ferramentas de infraestrutura como código.
 Ele contém metadados e configurações do aplicativo para facilitar sua
implantação e execução.
## app.js
- É frequentemente usado como o arquivo principal de configuração e
inicialização de aplicativos em Node.js.
 Ele é semelhante ao index.js, mas muitas vezes é separado para
organizar melhor o código.
## gitgnore
- é um arquivo usado pelo Git para especificar quais arquivos e
diretórios devem ser ignorados e não devem ser versionados no
repositório.
 Ele é essencial para evitar que arquivos desnecessários ou sensíveis
sejam enviados para o GitHub, GitLab ou qualquer outro sistema de
controle de versão.
## Assets
- A pasta assets/ é comumente usada em projetos de desenvolvimento
para armazenar recursos estáticos (arquivos que não mudam
dinamicamente no código).
 Ela pode aparecer em diferentes tipos de projetos, como web, mobile
e back-end, com finalidades variadas
## .expo
- A pasta .expo/ é criada automaticamente pelo Expo, uma plataforma
para desenvolvimento de aplicativos React Native.
 Ela contém arquivos temporários e metadados usados pelo Expo para
gerenciar e rodar o projeto.
## node_modules
- É onde o Node.js armazena todas as dependências do projeto.
 Sempre que você executa npm install, os pacotes definidos no
package.json são baixados e armazenados dentro dela.
