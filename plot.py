# Plot temperature data in a timeseries using MatPlotLib

import matplotlib.pyplot as plt
import matplotlib.animation as animation
import datetime


x = []
y = []

fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)

def animate(i, x, y):

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

    # limit to 20 values
    x = x[-20:]
    y = y[-20:]

    # Draw x and y lists
    ax.clear()
    ax.plot(x, y)

    # Format plot
    plt.xticks(rotation=45, ha='right')
    plt.subplots_adjust(bottom=0.30)
    plt.title('Temperature over Time')
    plt.ylabel('Temperature (deg C)')


# Set up plot to call animate() function periodically
ani = animation.FuncAnimation(fig, animate, fargs=(x, y), interval=1000)
plt.show()
