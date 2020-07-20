FROM openjdk:8-alpine

WORKDIR /opt
RUN wget -O openfire.tar.gz http://www.igniterealtime.org/downloadServlet?filename=openfire/openfire_4_5_2.tar.gz
RUN tar -xf openfire.tar.gz
RUN rm openfire.tar.gz

COPY start_openfire.sh /usr/bin/
EXPOSE 7070 7443 7777 9090 9091 5000-6000/udp 5000-6000/tcp
