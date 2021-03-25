import requests
import time
import random
maquina = "Motor"
for x in range (0,100):
    date = time.strftime('%Y-%m-%d %H:%M:%S', (time.localtime()))
    time.sleep(1)
    try:
        send = requests.post("http://127.0.0.1/Enviar",data={
            "Maquina":maquina,
            "Time":date,
            "Temperatura":round(random.uniform(30,100),2)
        })
        print("Enviado com sucesso! Data: %s"%str(date))
    except:
        print("Envio Falhou | Data: %s"%date)
