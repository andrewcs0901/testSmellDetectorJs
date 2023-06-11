# TestSmellDetectorJs

TestSmellDetectorJs é uma ferramenta desenvolvida para detecção de 8 tipos de _test smells_ para JavaScript.

| Test Smell | Descrição |
| --- | --- |
| Complex Snapshots | Testes que fazem uso de _snapshots_ com uma quantidade de linhas superior a 50 |
| Identical Test Description | Testes que possuem descrições idênticas |
| Non Functional Statement | Testes que possuem declarações não funcionais (blocos com escopo vazio "{}")|
| Only Test | Teste que fazem o uso da propriedade .only() do Jest, impossibilitando a execução de outros testes na suíte |
| Suboptimal Assert | Teste que utilizam asserções não adequadas para o _framework_ de testes |
| Unused Imports | Teste que possuem imports não utilizados |
| Verbose Test | Teste que possuem um nível de instruções superior a 13 |
| Verify in Setup Method | Teste que possuem instruções de verificação no método de configuração do teste ("beforeEach", "beforeAll", "afterEach", "afterAll") |

## Instruções de uso

1. No terminal utilize o `npm install` ou `yarn install` para instalar as dependências utilizadas neste projeto.
1. Em sequência utilize o `node index.js -input=<arquivo_de_testes>.csv -output=<arquivo_de_resultados>.csv` para executar a ferramenta

## Exemplo de formato de arquivo de entrada

A seguir é apresentado um exemplo de arquivo de entrada para a ferramenta. Note que não é necessário uma linha de cabeçalho no arquivo.

```csv
    localizacao_do_arquivo_de_testes.js,localizacao_do_arquivo_de_snapshots.snap
```

## Exemplo de formato de arquivo de saída

A seguir é apresentado um exemplo de arquivo gerado pela ferramenta:

```csv
    file,describeCount,itCount,complexSnapshots,identicalTestDescription,nonFunctionalStatement,onlyTest,subOptimalAssert,unusedImports,verboseTest,verifyInSetup
    localizacao_do_arquivo_de_testes.js,1,1,0,0,0,0,0,0,0,0
```

Significado das colunas e valores:

| Coluna | Descrição | Valores |
| --- | --- | --- |
| file | Caminho do arquivo de testes | Caminho do arquivo de testes |
| describeCount | Quantidade de blocos "describe" | Inteiro |
| itCount | Quantidade de blocos "it" | Inteiro |
| complexSnapshots | Quantidade de testes com _snapshots_ com mais de 50 linhas | Inteiro |
| identicalTestDescription | Quantidade de testes com descrições idênticas | Inteiro |
| nonFunctionalStatement | Quantidade de testes com blocos de escopo vazio "{}" | Inteiro |
| onlyTest | Quantidade de testes com a propriedade .only() | Inteiro |
| subOptimalAssert | Quantidade de testes com asserções não adequadas | Inteiro |
| unusedImports | Quantidade de testes com imports não utilizados | Inteiro |
| verboseTest | Quantidade de testes com mais de 13 instruções | Inteiro |
| verifyInSetup | Quantidade de testes com instruções de verificação no método de configuração do teste ("beforeEach", "beforeAll", "afterEach", "afterAll") | Inteiro |
