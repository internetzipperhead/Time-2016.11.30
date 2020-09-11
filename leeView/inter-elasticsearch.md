---
title: elaticsearch
tag: db bigdata
---

## 启动

1. elasticsearch.bat
2. grunt server
3. localshot:9100 // 可视化客户端
4. localshot:9200 // restful api 服务

## 常见问题或查询

### 获取es所有的索引列表

es.indices.get_alias('*)

## 优势、特点

1）可以作为一个大型分布式集群（数百台服务器）技术，处理PB级数据，服务大公司；也可以运行在单机上，服务小公司
2）Elasticsearch不是什么新技术，主要是将全文检索、数据分析以及分布式技术，合并在了一起，才形成了独一无二的ES；lucene（全文检索），商用的数据分析软件（也是有的），分布式数据库（mycat）
3）对用户而言，是开箱即用的，非常简单，作为中小型的应用，直接3分钟部署一下ES，就可以作为生产环境的系统来使用了，数据量不大，操作不是太复杂
4）数据库的功能面对很多领域是不够用的（事务，还有各种联机事务型的操作）；特殊的功能，比如全文检索，同义词处理，相关度排名，复杂数据分析，海量数据的近实时处理；Elasticsearch作为传统数据库的一个补充，提供了数据库所不不能提供的很多功能

## ES基本概念

### 解决什么问题

ES主要解决问题：
1）检索相关数据；
2）返回统计结果；
3）速度要快。

### ES核心概念

1）Cluster：集群。
ES可以作为一个独立的单个搜索服务器。不过，为了处理大型数据集，实现容错和高可用性，ES可以运行在许多互相合作的服务器上。这些服务器的集合称为集群。

2）Node：节点。
形成集群的每个服务器称为节点。

3）Shard：分片。
当有大量的文档时，由于内存的限制、磁盘处理能力不足、无法足够快的响应客户端的请求等，一个节点可能不够。这种情况下，数据可以分为较小的分片。每个分片放到不同的服务器上。
当你查询的索引分布在多个分片上时，ES会把查询发送给每个相关的分片，并将结果组合在一起，而应用程序并不知道分片的存在。即：这个过程对用户来说是透明的。

4）Replia：副本。
为提高查询吞吐量或实现高可用性，可以使用分片副本。
副本是一个分片的精确复制，每个分片可以有零个或多个副本。ES中可以有许多相同的分片，其中之一被选择更改索引操作，这种特殊的分片称为主分片。
当主分片丢失时，如：该分片所在的数据不可用时，集群将副本提升为新的主分片。

5）全文检索。
全文检索就是对一篇文章进行索引，可以根据关键字搜索，类似于mysql里的like语句。

### ES数据架构的主要概念（与关系数据库Mysql对比）

#### 6.x 之前的版本

（1）关系型数据库中的数据库（DataBase），等价于ES中的索引（Index）
（2）一个数据库下面有N张表（Table），等价于1个索引Index下面有N多类型（Type），
（3）一个数据库表（Table）下的数据由多行（ROW）多列（column，属性）组成，等价于1个Type由多个文档（Document）和多Field组成。
（4）在一个关系型数据库里面，schema定义了表、每个表的字段，还有表和字段之间的关系。 与之对应的，在ES中：Mapping定义索引下的Type的字段处理规则，即索引如何建立、索引类型、是否保存原始索引JSON文档、是否压缩原始JSON文档、是否需要分词处理、如何进行分词处理等。
（5）在数据库中的增insert、删delete、改update、查search操作等价于ES中的增PUT/POST、删Delete、改_update、查GET

#### 7.x 最新的版本(删除了type)

索引（indices）--------------------------------数据库

文档（Document）----------------Row 行

字段（Field）-------------------Columns 列

索引库（indices) --- indices是index的复数，代表许多的索引，
文档（document）--- 存入索引库原始的数据。比如每一条商品信息，就是一个文档
字段（field）--- 文档中的属性
映射配置（mappings）--- 字段的数据类型、属性、是否索引、是否存储等特性

索引集（Indices，index的复数）：逻辑上的完整索引
分片（shard）：数据拆分后的各个部分
副本（replica）：每个分片的复制
要注意的是：Elasticsearch本身就是分布式的，因此即便你只有一个节点，Elasticsearch默认也会对你的数据进行分片和副本操作，当你向集群添加新数据时，数据也会在新加入的节点中进行平衡。

**Index**
Elasticsearch 会索引所有字段，经过处理后写入一个反向索引（Inverted Index）。查找数据的时候，直接查找该索引。

所以，Elasticsearch 数据管理的顶层单位就叫做 Index（索引），其实就相当于 MySQL、MongoDB 等里面的数据库的概念。另外值得注意的是，每个 Index （即数据库）的名字必须是小写。

### ELK是什么

ELK = elasticsearch + Logstash + kibana
elasticsearch：后台分布式存储以及全文检索
logstash: 日志加工、“搬运工”
kibana：数据可视化展示。
ELK架构为数据分布式存储、可视化查询和日志解析创建了一个功能强大的管理链。 三者相互配合，取长补短，共同完成分布式大数据处理工作。

### ES特点和优势

1）分布式实时文件存储，可将每一个字段存入索引，使其可以被检索到。
2）实时分析的分布式搜索引擎。
分布式：索引分拆成多个分片，每个分片可有零个或多个副本。集群中的每个数据节点都可承载一个或多个分片，并且协调和处理各种操作；
负载再平衡和路由在大多数情况下自动完成。
3）可以扩展到上百台服务器，处理PB级别的结构化或非结构化数据。也可以运行在单台PC上（已测试）
4）支持插件机制，分词插件、同步插件、Hadoop插件、可视化插件等。

## 基本使用

### 创建索引库（数据库）

"number_of_shards": 1 分片数
"number_of_replicas": 1 副本数

```js
PUT people
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  }

}

// return
{
  "acknowledged" : true,
  "shards_acknowledged" : true,
  "index" : "people"
}
```

### 查看索引信息

``` JS
http://localhost:9200/_cat/indices?v
```

### 删索引库

```js
DELETE people
```

### 查询索引库

```JS
GET  people

结果：

{
  "people" : {
    "aliases" : { },
    "mappings" : { },
    "settings" : {
      "index" : {
        "creation_date" : "1564308107803",
        "number_of_shards" : "1",
        "number_of_replicas" : "1",
        "uuid" : "zQYt9-BXR9yuQOLNugAabg",
        "version" : {
          "created" : "7020099"
        },
        "provided_name" : "item"
      }
    }
  }
}
```

## 查询索引库是否存在

``` JS
HEAD people

返回

200 - OK
```

### 创建映射关系(数据库列) 👍

type：类型，可以是text、long、short、date、integer、object等
index：是否索引，默认为true. 是false；不会为该值创建索引，也就是无法当作主查询条件
store：是否存储，默认为false
analyzer：分词器，这里的ik_max_word即使用ik分词器
copy_to: 该属性允许我们将多个字段的值复制到组字段中，然后将组字段作为单个字段进行查询

REFER: https://blog.csdn.net/abc123lzf/article/details/102957060

text
text类型适用于需要被全文检索的字段，例如新闻正文、邮件内容等比较长的文字。text类型会被Lucene分词器（Analyzer）处理为一个个词项，并使用Lucene倒排索引存储。text字段不能被用于排序。如果需要使用该类型的字段只需要在定义映射时指定JSON中对应字段的type为text。

keyword
keyword适合简短、结构化字符串，例如主机名、姓名、商品名称等，可以用于过滤、排序、聚合检索，也可以用于精确查询。

``` JS
PUT people/_mapping

{
  "properties": {
    "name": {
      "type": "text",
      "analyzer": "ik_max_word"
    },
    "age": {
      "type": "integer",
      "index": "false"
    },
    "sex": {
      "type": "keyword"
    }
  }
}
```

如果再次创建不通话映射则为新增映射

### 查询映射关系

```js
GET people/_mapping

{
  "people" : {
    "mappings" : {
      "properties" : {
        "age" : {
          "type" : "integer",
          "index" : false
        },
        "name" : {
          "type" : "text",
          "analyzer" : "ik_max_word"
        },
        "sex" : {
          "type" : "keyword"
        }
      }
    }
  }
}
```

### 添加 更新数据

如果_doc 后面不指定id数 会默认生成随机id

``` JS
POST people/_doc/1
{
  "name" : "小明",
  "age" : 18,
  "sex": "男"
}
```

使用相同的代码更改部分 即可更改

``` JS
POST people/_doc/1
{
  "name" : "小红",
  "age" : 18,
  "sex": "女"
}
```

### 获取数据

``` JS
GET people/_doc/1

或者查询所有

GET people/_search
```

### 删除数据

通过查询id进行删除即可

```js
DELETE people/_doc/1
```

### 查询功能

#### 全部查询

``` JS
GET /索引库名/_search
{
    "query":{
        "查询类型":{
            "查询条件":"查询条件值"
        }
    }
}

// or

GET people/_search
{
  "query": {
    "match_all": {}
  }
}
```

#### 匹配查询

> full-text search（全文检索）

``` JS
GET people/_search
{
  "query": {
    "match": {
      "name": "小王2"
    }
  }
}

// 匹配producer中包含yagao 和 producer的数据
{
  "query" : {
    "match" : {
      "producer" : "yagao producer"
    }
  }
}

// 如果我们只想要小王2 则通过更改关联关系(此时我们只能查询到小王2)

GET people/_search
{
  "query": {
    "match": {
      "name":{"query": "小王2","operator": "and"}
    }
  }
}
```

**phrase search（短语搜索）**
与全文检索相反，全文检索会将输入的搜索串拆解开来，去倒排索引里面去一一匹配，只要能匹配上任意一个拆解后的单词，就可以作为结果返回

phrase search，要求输入的搜索串，必须在指定的字段文本中，完全包含一模一样的，才可以算匹配，才能作为结果返回

``` Python
GET /ecommerce/product/_search
{
    "query" : {
        "match_phrase" : {
            "producer" : "yagao producer"
        }
    }
}
```

**highlight search（高亮搜索结果）**：

``` Python
GET /ecommerce/product/_search
{
    "query" : {
        "match" : {
            "producer" : "producer"
        }
    },
    "highlight": {
        "fields" : {
          "pre_tags": "<b style='color: red;'>",
          "post_tags: "</b>",
          "producer" : {}
        }
    }
}
```

### 设置最小匹配度查询

如果满足其中的50% 岂可视为查询正确 小王和小王2都会查询出来
如果设置为100% 则只会查出小王2

``` JS
GET people/_search
{
  "query": {
    "match": {
      "name":{"query": "小王2","minimum_should_match": "50%"}
    }
  }
}
```

#### 多字段查询

我们在sex 和name中查询带 “男”字 的信息

```js
GET people/_search
{
  "query": {
    "multi_match": {
      "query": "男",
      "fields": ["name","sex"]
    }
  }
}
```

#### 词条匹配（精确查找）

term 查询被用于精确值 匹配，这些精确值可能是数字、时间、布尔或者那些未分词的字符串
terms 就是查询多个

``` JS
GET people/_search
{
 "query": {
   "terms": {
     "sex": [
       "男","女"
     ]
   }
 }
```

#### terms 和 match 的区别

term和match的区别:

match是经过分析(analyer)的，也就是说，文档是先被分析器处理了，根据不同的分析器，分析出的结果也会不同，在会根据分词 结果进行匹配。
term是不经过分词的，直接去倒排索引查找精确的值。

👍keyword 字段类型不会被分析器分析

#### 结果过滤

我们只需要name字段

``` JS
GET people/_search
{

  "query": {
    "terms": {
      "sex": [
        "男","女"
      ]
    }
  },"_source": "name"
}

// 我们不需要带有age 的信息
GET people/_search
{

  "query": {
    "terms": {
      "sex": [
        "男","女"
      ]
    }
  },"_source": {
    "excludes": "age"
  }
}

// 我们只需要性别和名字
GET people/_search
{

  "query": {
    "terms": {
      "sex": [
        "男","女"
      ]
    }
  },"_source": {
    "includes": ["name","sex"]
  }
}

```

### TIP: 聚合查询

REFER: https://blog.csdn.net/alex_xfboy/article/details/86100037

``` Python
"aggregations" : {                        //也可简写为 aggs
    "<aggregation_name>" : {      //聚合的名字
        "<aggregation_type>" : {     //聚合的类型
            <aggregation_body>      //聚合体：对哪些字段进行聚合
        }
        [,"meta" : {  [<meta_data_body>] } ]?                 //元
        [,"aggregations" : { [<sub_aggregation>]+ } ]?   //在聚合里面在定义子聚合
    }
    [,"<aggregation_name_2>" : { ... } ]*                      //聚合的名字
}
```


对名称中包含yagao的商品，计算每个tag下的商品数量

前提： 将文本field的fielddata属性设置为true

``` Python
PUT /ecommerce/_mapping/product
{
  "properties": {
    "tags": {
      "type": "text",
      "fielddata": true
    }
  }
}
```

``` Python
GET /ecommerce/product/_search
{
  "size": 0, # 🎈不查询出数据，只统计
  "query": {
    "match": {
      "name": "yagao"
    }
  },
  "aggs": {
    "all_tags": {
      "terms": {
        "field": "tags"
      }
    }
  }
}
```

### 范围聚合

GET http://{{hostname}}:9201/people/_search
User-Agent: vscode-restclient
Content-Type: {{contentType}}

{
  "size": 0,
  "query": {
    "match_all": {}
  },
  "aggs": {
    "test_missing": {
      "range": {
        "field": "age",
        "ranges": [
          {
            "from": 10,
            "to": 30
          }
        ]
      }
    }
  }
}

### Bool查询

Bool Query，Bool 查询用bool操作来组合多个查询字句为一个查询。映射Lucene BooleanQuery。

bool查询与bool过滤器一个重要的区别，过滤器做二元判断：文档是否应该出现在结果中？但查询更精妙，它除了决定一个文档是否应该被包括在结果中，还会计算文档的相关程度。

bool 查询会为每个文档计算相关度评分 _score ， 再将所有匹配的 must 和 should 语句的分数 _score 求和，最后除以 must 和 should 语句的总数

**可用的关键字**：

must      与AND等价，并有助于得分
filter    必须匹配，但它在 Filter上下文中执行，不影响评分
should    与OR等价
must_not  与NOT等价，在 Filter上下文中执行，不影响评分

``` Python
POST _search
{
  "query": {
    "bool" : {
      "must" : {
        "term" : { "user" : "kimchy" }
      },
      "filter": {
        "term" : { "tag" : "tech" }
      },
      "must_not" : {
        "range" : {
          "age" : { "gte" : 10, "lte" : 20 }
        }
      },
      "should" : [
        { "term" : { "tag" : "wow" } },
        { "term" : { "tag" : "elasticsearch" } }
      ],
      "minimum_should_match" : 1,
      "boost" : 1.0
    }
  }
}
```

``` Python
GET _search
{
  "query": {
    "bool": {
      "filter": { // 在filter元素下指定的查询对得分没有影响 - 得分返回为0
        "term": {
          "status": "active"
        }
      }
    }
  }
}
```

``` Python
GET _search
{
  "query": {
    "bool": {
      "must": { // 有一个match_all查询，它为所有文档指定1.0分
        "match_all": {}
      },
      "filter": {
        "term": {
          "status": "active"
        }
      }
    }
  }
}
```

### 基本结构

``` Python
{
   "query":{
      "bool":{
          "must":{
          },
          "must_not":{},
          "filter":{},
          "should":{},
          "should_not":{}
       }
  }
}
```

### 数组查询

``` Python
{
    "query":{
          "nested":{
                 "path":"firm_app",
                 "query":{
                 "match":{
                     "firm_app.app":"noticias"
                  }
              }
         }
    }
}

# or
GET my_index/_search
{
  "query": {
    "nested": {
      "path": "user",
      "query": {
        "bool": {
          "must": [
            { "match": { "user.first": "Alice" }},
            { "match": { "user.last":  "White" }}
          ]
        }
      }
    }
  }
}
```

### 对象查询

``` Python
{
   "query":{
        "term":{
              "language.v4.keyword": "Spanish"
        }
   }
}
```

## 路由

确保数据存储和查询都在同一块分片上，提升查询效率

``` Python
PUT topic/_doc/1?routing=user1
{
  "name": "leeee"
}

# 查询路由上的所有数据

GET topic/_doc/_search
{
  "query: {
    "terms": {
      "_routing": ["user1"]
    }
  }
}
```

这样存储后，删除文档也需要带上 路由的名称

### es别名

REFER: https://www.cnblogs.com/Neeo/articles/10897280.html

创建别名

``` Python
POST /_aliases
{
  "actions": [
    {
      "add": {
        "index": "topic",
        "alias": "my_topic"
      }
    }
  ]
}

```

查询别名

``` Python
GET topic/_alias
```

删除别名

``` Python
POST /_aliases
{
  "actions": [
    {
      "remove": {
        "index": "topic",
        "alias": "my_topic"
      }
    }
  ]
}
```

## python 操作

### 连接

``` Python
# 指定连接
es = Elasticsearch(
    ['172.16.153.129:9200'],
    # 认证信息
    # http_auth=('elastic', 'changeme')
)

# 动态连接
es = Elasticsearch(
    ['esnode1:port', 'esnode2:port'],
    # 在做任何操作之前，先进行嗅探
    sniff_on_start=True,
    # 节点没有响应时，进行刷新，重新连接
    sniff_on_connection_fail=True,
    # 每 60 秒刷新一次
    sniffer_timeout=60
)

# 不同的节点，赋予不同的参数
es = Elasticsearch([
    {'host': 'localhost'},
    {'host': 'othernode', 'port': 443, 'url_prefix': 'es', 'use_ssl': True},
])

#假如使用了 ssl
es = Elasticsearch(
    ['localhost:443', 'other_host:443'],
    # 打开SSL
    use_ssl=True,
    # 确保我们验证了SSL证书（默认关闭）
    verify_certs=True,
    # 提供CA证书的路径
    ca_certs='/path/to/CA_certs',
    # PEM格式的SSL客户端证书
    client_cert='/path/to/clientcert.pem',
    # PEM格式的SSL客户端密钥
    client_key='/path/to/clientkey.pem'
)
```

2、测试集群是否启动

``` Python
# 测试集群是否启动
es.ping()
# 获取集群基本信息
es.info()
# 获取当前连接的集群节点信息
es.cluster.client.info()
# 获取集群目前所有的索引
es.cat.indices()
# 获取集群的更多信息
es.cluster.stats()
# 任务
es.tasks.get()
es.tasks.list()
```

### 查询

``` Python 发起查询请求
es = Elasticsearch(
        ['127.0.0.1:9201']
    )

response = es.search(
    index="logstash-2017.11.14", # 索引名
    body={             # 请求体
      "query": {       # 关键字，把查询语句给 query
          "bool": {    # 关键字，表示使用 filter 查询，没有匹配度
                "must": [      # 表示里面的条件必须匹配，多个匹配元素可以放在列表里
                    {
                        "match": {  # 关键字，表示需要匹配的元素
                            "TransId": '06100021650016153'   # TransId 是字段名， 06100021650016153 是此字段需要匹配到的值
                        }
                    },
                    {
                        "match": {
                            "Ds": '2017-05-06'
                        }
                    },
                    {
                        "match": {
                            "Gy": '2012020235'
                        }
                    }, ],
                 "must_not": {   # 关键字，表示查询的结果里必须不匹配里面的元素
                        "match": {  # 关键字
                            "message": "M("    # message 字段名，这个字段的值一般是查询到的结果内容体。这里的意思是，返回的结果里不能包含特殊字符 'M('
                        }
                 }
            }
        },

        # 下面是对返回的结果继续排序
        "sort": [{"@timestamp": {"order": "desc"}}],
        "from": start,  # 从匹配到的结果中的第几条数据开始返回，值是匹配到的数据的下标，从 0 开始
        "size": size    # 返回多少条数据
      }
)
```

### 高级模块

``` Python
es = Elasticsearch(
        ['172.16.153.129:9200']
    )
s = Search(using=es,
    index="logstash-2017.11.14").filter("match",Gy='20160521491').query("match", TransId='06100021650016153').exclude("match", message="M(")

response = s.execute()


using：指明用那个已经连接的对象
query：接收的是查询体语句
exclude：接收的是不匹配的字段 就像 must_not

filter：接收的是过滤语句 ，过滤的条件意思是在返回结果中有这些条件的信息
```

### elasticsearch-dsl

DSL：Domain Specified Language，特定领域的语言

更加适合生产环境的使用，可以构建复杂的查询

### bulk 批量存储

``` Python
from elasticsearch import helpers

datas = (
        {
            "_index": "topic",
            "_type": "_doc",
            "_source": {
                'id': item['_id'],
                "number" : item['number'],
                "forLevel" : item['forLevel'],
                "knowledge" : item['knowledge'],
                "difficulty" : item['difficulty'],
                "type" : item['type'],
                "title" : item['title'],
                "analysis" : item['analysis'],
                "accuracy" : item['accuracy'],
                "creatorId" : item['creatorId'],
                "eCode" : item['eCode'],
                "createTime" : item['createTime'].strftime('%Y-%m-%d %H:%M:%S'),
                "modifyTime" : item['modifyTime'].strftime('%Y-%m-%d %H:%M:%S') if item['modifyTime'] else item['createTime'].strftime('%Y-%m-%d %H:%M:%S'),
                "options": item['options']
            }
        } for item in res)
    now = time()
    print(now)
    helpers.bulk(es, datas)
```

### 临时改变查询的最大条目

默认值是 10000 条

``` Python
GET topic/_settings
{
  "index: {
    "max_result_window": "20000"
  }
}

# 处理完之后再修改过来
GET topic/_settings
{
  "index: {
    "max_result_window": "10000"
  }
}
```

## linux

### linux 环境下配置 es 相关环境

REFER: https://www.cnblogs.com/Neeo/articles/10840096.html
