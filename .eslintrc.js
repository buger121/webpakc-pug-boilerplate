module.exports = {
	env: {
			browser: true,
			es2021: true,
			jquery: true,
	},
	extends: ['airbnb-base', 'prettier'],
	overrides: [],
	parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
	},
	rules: {
			'no-underscore-dangle': 'off', // 允许使用悬空下划线表示私有变量
			'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // 允许仅在for循环中使用一元运算符
			'no-param-reassign': ['error', { props: false }], // 允许修改函数参数为对象类型的属性
			"import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
	},
	ignorePatterns: ['gulpfile.js', 'src/vendor'],
};
