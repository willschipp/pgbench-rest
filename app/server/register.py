from collections import deque

queue = deque(maxlen=10)

def registerResult(result):
    queue.append(result)

def getResults():
    return list(queue)