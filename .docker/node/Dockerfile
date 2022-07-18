FROM node:16.15.1-slim

RUN apt-get update \
    && apt-get autoremove -y \
    && apt-get install -y \
    # 全てgitの導入・実行に必要なパッケージ
    asciidoc \
    gcc \
    gettext \
    libcurl4-gnutls-dev \
    libexpat1-dev \
    libssl-dev \
    libz-dev \
    less \
    make \
    man \
    perl \
    ssh \
    vim \
    wget \
    # "wish", the Tcl/Tk windowing shell is used in gitk to show the history graphically, and git-gui.
    wish \
    # 新しいバージョンのgitを使いたいため、ソースからインストールする
    && wget https://github.com/git/git/archive/v2.37.1.tar.gz \
    && tar -xzf v2.37.1.tar.gz \
    && cd git-* \
    && make prefix=/usr install install-doc \
    # 容量削減のため、インストーラーを削除する
    && cd .. \
    && rm -f v2.37.1.tar.gz \
    && rm -rf git-*

WORKDIR /pokemonote

ENV CHOKIDAR_USEPOLLING=true
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

CMD ["/bin/bash"]
