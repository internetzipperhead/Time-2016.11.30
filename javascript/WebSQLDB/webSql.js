/*
* Web SQL 封装类
*
* Attention：
* Firefox 不支持啊。这就有点吓人了
* W3C 已经不维护这个 API 了
*/
class WebSql {
	constructor(options={}) {
		this.options = {
			dbName: 'leeing',
			version: 'v1.0',
			dbDesc: 'just for learn',
			size: 1204*1024
		}
		Object.assign(this.options, options)
		console.log(this)
		this.initDB()
	}
	initDB() {
		let that = this
		this.db = openDatabase(
			this.options.dbName, 
			this.options.version, 
			this.options.dbDesc, 
			this.options.size, 
			function() {
				console.log(this)
				if (!that.db) {
					console.log('${this.options.dbName} Datebase has created failed')
				} else {
					console.log('${this.options.dbName} Datebase has created success')
				}
			}
		)
		console.log(this.db)
	}
	createTable(sql) {
		console.log(7788)
		this.db.transaction(tx => {
			tx.executeSql(
				sql,
				[],
				(tx, result) => {console.log('table has created ~')},
				(tx, error) => {console.log('table created failed: ' + error.message)}
			)
		})
	}
	insertData(sql, data) {
		console.log(8877)
		this.db.transaction(tx => {
			data.forEach(item => {
				tx.executeSql(
					sql,
					item,
					(tx, ret) => {console.log(`执行sql: 【${sql}】, 参数：【${item}】`)},
					(tx, ret) => {console.log('插入数据失败')}
				)
			})
		})
	}
	fetchall(sql) {
		return new Promise((resolve, reject) => {
			this.db.transaction(tx => {
				tx.executeSql(
					sql,
					[],
					(tx, ret) => {
						console.log(`执行sql: 【${sql}】`)
						console.log(ret)
						resolve(ret.rows)
					},
					(tx, error) => {console.log('获取数据失败'); reject(error.message)}
				)
			})
		})
	}
	fetchone(sql, data) {
		this.db.transaction(tx => {
			tx.executeSql(
				sql,
				[],
				(tx, ret) => {
					console.log(`执行sql: 【${sql}】`)
					console.log(ret)
					return ret
				},
				(tx, ret) => {console.log('获取数据失败')}
			)
		})
	}
	updateData(sql, data) {
		this.db.transaction(tx => {
			data.forEach(item => {
				tx.executeSql(
					sql,
					item,
					(tx, ret) => {
						console.log(`执行sql: 【${sql}】, 参数：【${item}】`)
						console.log(ret)
					},
					(tx, error) => {console.log('更新数据失败')}
				)
			})
		})
	}
	deleteData(sql, data) {
		this.db.transaction(tx => {
			data.forEach(item => {
				tx.executeSql(
					sql,
					item,
					(tx, ret) => {console.log(`执行sql: 【${sql}】, 参数：【${item}】`)},
					(tx, ret) => {console.log('删除数据失败')}
				)
			})
		})
	}
	dropTable(tableName) {
		this.db.transaction(tx => {
			tx.executeSql(
				`drop table ${tableName}`,
				[],
				(tx, ret) => {console.log(`${tableName} 数据表删除成功！`)}
			)
		})
	}
}

