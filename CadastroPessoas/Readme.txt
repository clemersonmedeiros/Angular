#-----------------------------------#
#       MANUAL DE INSTALAÇÃO        #
#-----------------------------------#


-- Sumário --

1. Definições Técnicas
2. Instalações
    2.1. Instalação do Java JDK 11
    2.2. Instalação do Angular CLI e Devkit
    2.3. Instalação do PostgreSQL
3. Execução do Servidor e Client
4. Informações Adicionais

#############################################################################

1. Definições Técnicas

Utilizado:
 - Spring-boot 2.1.6.RELEASE;
 - Java JDK 11.0.3;
 - Angular CLI 8.1.1;
 - Material Angular 8.0.2;
 - Node 10.15.3;
 - Angular package devkit 8.1.1;
 - PostgreSQL 10.9;

#############################################################################

2. Instalações

    2.1. Instalação do Java JDK 11

    O Java development Kit permitirá a execução do servidor da aplicação. Para instalá-lo
    acesse o link e faça download do executável de seu sistema operacional:
        
        https://www.oracle.com/technetwork/java/javase/downloads/jdk11-downloads-5066655.html

    Após instalar deverá ser ajustado as variáveis de ambiente da sua máquina. Localize o 
    diretório que está instalado o Java (Path do JDK). Para máquinas windows, pressione Win + R 
    do teclado e digite:
        
        SystemPropertiesAdvanced 

    Depois clique em Variáveis de Ambiente, e na tabela abaixo adicione um Novo e preencha com 
    os seguintes dados:

        Nome da Variável: JAVA_HOME
        Valor da Variável: (Path do JDK, exemplo: C:\Program Files\Java\jdk-11.0.3 )

    Para testar se funcionou aperte Win + R e digite %JAVA_HOME%. Se o sistema abrir a pasta do
    JDK, funcionou perfeitamente! Para máquinas Linux deixo o link que ensina o passo a passo de 
    Instalação:

        https://receitasdecodigo.com.br/ubuntu/como-configurar-java_home-para-java-no-ubuntu

    ___________________________________________________________________________________________

    2.2. Instalação do Angular CLI e Devkit

    Com o Java Instalado será possível preparar o ambiente para o Angular CLI e seus pacotes de 
    desenvolvimento. Para isso será necessário que tenha instalado na sua máquina o Node.JS, que 
    pode ser baixado pelo seguinte link:

        https://nodejs.org/en/download/

    Dessa forma, será possível utilizar os comandos 'npm' para importar dependências à aplicação.
    Sendo assim, abra o pront de comando (Win+R  cmd) e digite o seguinte comando:

        npm install -g @angular/cli
    
    Após finalizar a instalação digite:

        npm install --save-dev @angular-devkit/build-angular

    ___________________________________________________________________________________________

    2.3. Instalação do PostgreSQL 

    Feita a instalação do JDK e Angular CLI, devemos adicionar um banco de dados em nosso ambiente.
    Faça download do PostgreSQL pelo link abaixo:

        https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
    
    Durante desenvolvimento foi utilizado a versão 10.9 da versão Windows. Nessa instalação, adicione 
    o PgAdmin e o command-line(Obrigatório) para permitir que seja criado uma database. Agora abra o 
    sistema PgAdmin que foi instalado e acesse a base de dados a partir da página web que o PostgreSQL 
    vai abrir. Nela clique com o botão direito em Databases (Servers\PostgreSQL ...\Databases) e clique 
    em "Create> DataBase... ", coloque o nome de "avaliacao".

    Em seguida abra a pasta dessa aplicação (Cadastro Pessoas) e acesse o seguinte arquivo:

        ..\CadastroPessoas\server\src\main\resources\application.properties

    Nesse arquivo certifique-se que as informações de acesso ao banco de dados estão devidamente preenchidas
    de acordo com o seu ambiente.


#############################################################################

3. Execução do Servidor e Client

    Com tudo instalado, acesse a partir do pront de comando (Win+R  cmd) a pasta que está localizado esse 
    arquivo Readme.txt, e digite os seguintes comando para abrir a aplicação do Servidor:

        cd server
        mvnw spring-boot:run
    
    O sistema fará download de todas as bibliotecas a partir do maven e criará as tabelas dessa aplicação. 
    Depois deverá aparecer a seguinte mensagem:
        
        O servidor está executando!

    Mantenha o servidor aberto, neste momento está operando em http://localhost:8080/. Caso apareça algum erro, 
    certificar que o antivírus não esteja bloqueando o download e que o JAVA_HOME esteja devidamente direcionado.
    
    Agora executaremos o Client. Para isso abra mais um pront (Win+R  cmd) e acesse a pasta que desse arquivo
    Readme.txt mais uma vez e execute o seguinte comando:

        cd client
        ng serve
    
    Aguarde a instalação das dependências, como o material.angular, link para saber mais:

        https://material.angular.io/

    Quando finalizado, uma mensagem escrita "Compiled Successfully" aparecerá. Mantenha também esse arquivo aberto,
    e acesse pelo browser o link:

        http://localhost:4200/

    A tela Gestão de Pessoas deverá aparecer! 

#############################################################################

4. Informações Adicionais

    - Qualquer problema ou dúvida, entrar em contato:
        - email: clemerson.m.b@hotmail.com;
        - Skype: clemerson medeiros;
    
