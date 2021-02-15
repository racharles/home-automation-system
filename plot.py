# Plot temperature data in a timeseries using MatPlotLib

import matplotlib.pyplot as plt
import datetime


x = []
y = []

# open and parse file
f = open("zetta-server/data.txt", "r")
contents = f.read()
lines = contents.split("\n")
for line in lines:
    if line:
        parts = line.split()
        # print(parts)
        date = parts[0]
        time = parts[1]

        # datetime.time
        temp = parts[2]
        x.append(time)
        y.append(float(temp))

f.close()

plt.plot(x,y)
plt.xlabel('Time')
plt.ylabel('Temperature (C)')
plt.title("Temperature vs Time")

while(1):
    plt.pause(0.05)
plt.show()
