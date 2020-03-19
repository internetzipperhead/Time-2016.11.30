# -*- coding: utf-8 -*-
"""
一个在flask应用中可能遇到的问题
用户修改密码之后，旧密码的token仍然生效

引申一个话题：禁用令牌（重点）：
需求场景
    用户修改密码, 需要颁发新的token, 禁用还在有效期的旧token
    后台封禁用户
逻辑
    禁用旧密码的令牌
"""

import random
from redis import StrictRedis

# 创建 redis 客户端
redis_client = StrictRedis()

user_id = 12
key = f'token:{user_id}'
token = None

def update_pwd():
    """修改密码"""
    print('密码修改成功')
    # 判断用户是否有白名单
    # 如果有，先删除已有的白名单
    if redis_client.exists(key):
        redis_client.delete(key)
    # 记录修改过密码的用户
    redis_client.sadd(key, 0)
    # 设置过期时间
    redis_client.expire(key, 846600 * 14)


def login():
    """登录"""
    print('登录成功')
    # 生成token
    global token
    token = random.randint(100, 999)

    # 判断用户是否修改过密码
    if redis_client.exists(key):
        # 将新的token保存到白名单中
        redis_client.sadd(key, token)


def access():
    """访问路由"""
    print('校验token成功')
    if redis_client.exists(key):
        # 修改过密码，再判断该token是否在白名单中
        if redis_client.sismember(key, token):
            print('是新token，正常访问')
        else:
            print('是旧token，需要重新登录')
    else:
        print('没有修改过密码，成功访问')


def get_access_token():
    """获取新的访问token"""
    if redis_client.exists(key):
        if redis_client.sismember(key, token):
            print('是新token，生成新的访问token')
        else:
            print('是旧token，需要重新登录')
    else:
        print('直接生成新的访问token')


if __name__ == '__main__':
    update_pwd()
    login()
    access()