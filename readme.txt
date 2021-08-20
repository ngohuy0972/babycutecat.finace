

<----       Làm việc với framework Laravel trên Ubuntu      ---->

I. Thiết lập môi trường làm việc với Laravel trên Ubuntu 20.04. 	
	- Môt trường setup làm việc : Ubuntu 20.04
	
II. Môi trường cần để chạy Laravel : link tha khảo (https://itzone.com.vn/vi/article/huong-dan-thiet-lap-moi-truong-chay-ung-dung-laravel-tren-ubuntu/).
	
	+ Cài đặt apache  : sudo apt-get install apache2 -> chọn Y.
	
	+ Cài đăt mysql : sudo apt-get install mysql-server -> Y.
	
	Sau khi cài đặt xong  chạy câu lệnh : sudo mysql_secure_installation -> thiết lập password cho mysql và thiết lập các lựa chọn theo mong muốn của mình.
	
	+ Sau khi đã cài đặt xong MySQL. Tiếp theo chạy cậu lệnh sau: mysql -u root -p để truy cập vào MySQL, root ở đây là username mặc định khi cài đặt MySQL. Bạn cũng thể tự tạo một tài khoản khác để truy cập vào MySQL.
	
	+ Nhập mật khẩu đã thiết lập trước đó, nếu như hiện thông tin như ảnh trên. Thì chạy câu lệnh sau: sudo mysql. Để truy cập vào MySQL với quyền root mà không cần mật khẩu cho tài khoản có username là root.
	
	+ Sau khi đăng nhập vào MySQL với quyền root, chạy câu lệnh sau: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; (password thay bằng mật khẩu lúc đầu).
	
	+ Tiếp theo chạy câu lệnh:FLUSH PRIVILEGES; Mục đích là để reload lại và apply những thay đổi.
	
III. Cài đặt PHP trên ubuntu : 
	
	+ Chạy câu lệnh sau: $ sudo apt-get install php libapache2-mod-php php-mysql
	
	+ Để kiểm tra thành công chưa, chạy câu lệnh : php -v
	
	+ Tiếp cần phải cài đặt một số thư viện cần thiết cho PHP. Ở đây mình cài thư viện mcrypt.
	+ Chạy câu lệnh sau: sudo apt install php-dev libmcrypt-dev php-pear
	+ Sau đó chạy tiếp 2 câu lệnh sau: sudo pecl channel-update pecl.php.net và sudo pecl install mcrypt-1.0.1
	+ Sau khi cài đặt xong, chạy câu lệnh sau: sudo nano /etc/php/7.2/cli/php.ini và thêm vào file php.ini dòng sau: extension=mcrypt.so
	
	+ Sau đó Ctrl + S và Ctrl + X để lưu lại. Để kiểm tra cài đặt thành công hay chưa, sử dụng câu lệnh sau: php -m | grep mcrypt. Nếu thành công sẽ hiện ra dòng chữ "mcrypt".
	
IV. Cài đặt Composer.(Composer là công cụ để quả lý package hay library PHP. Composer sẽ cài đặt những libraries vào một thư mục nào đó nằm bên trong project bạn đang làm việc.)

	+ php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
     	+ php -r "if (hash_file('sha384', 'composer-setup.php') === 'c5b9b6d368201a9db6f74e2611495f369991b72d9c8cbd3ffbc63edff210eb73d46ffbfce88669ad33695ef77dc76976') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
     	+ php composer-setup.php
        + php -r "unlink('composer-setup.php');"

	+ Kiểm tra đã cài đặt chưa chạy câu lệnh : php composer.phar
	
	+ Để có thể ở bất cứ đâu cũng có thể sử dụng Composer, sử dụng câu lệnh sau: sudo mv composer.phar /usr/local/bin/composer. Sau đó chạy câu lệnh: composer. Để kiểm tra config đã thành công chưa.
	
V. Cài đặt laravel và deploy trang web.(Link tham khảo : https://www.youtube.com/watch?v=wiX-We_X34I)
	--> Clone project laravel và deploy.
	1. git clone
	2. composer install && composer update
	3. php artisan key:gen
	4. php artisan serve
	
	
VI. Deploy website lên Hosting của nhà cung cấp HawkHost thông qua Cpannel (Link tham khảo : https://blog.hostvn.net/chia-se/huong-dan-upload-laravel-len-hosting-cpanel.html).

	- Cách mua hosting Hawkhost : https://www.youtube.com/watch?v=K64bvLITUdM.
	- Cách trỏ tên miền về hosting Hawkhost dễ dàng : https://www.youtube.com/watch?v=pT4fxd3Pyrs.
	- Upload website lên hosting : https://www.youtube.com/watch?v=XQiFX5T0WfQ.
	
	--> Lưu ý trên Cpannel khi deploy website Laravel thì nó sẽ ko đi thẳng vào thư mục public nên chúng ta sẽ tạo file .htaccess ngang hàng với public. Sau đó copy nội dung sau vào file và save lại.
	<IfModule mod_rewrite.c>
	    RewriteEngine On
	    RewriteCond %{REQUEST_URI} !^/public/
	    RewriteRule ^(.*)$ /public/$1 [L,QSA]
	</IfModule>
	
	
	
	
	
	
	
<----       Phần code thuân trên Ubuntu      ---->	
Phần code thuần này không sử dụng công nghệ hay framework nào cả nên ko có phần hướng dẫn cài đặt mà chỉ lấy code dùng luôn
	
1. Cấu trúc thư mục :
	- index.html (Trang About).
	- exchange.html (Trang Exchange).
	- roadmap.html (Trang Roadmap).
	- ntf.html (Trang NFT).
	- whitepaper.html (Trang Whitepaper).
2. frontend/css. (Style)
	- style.css (style cho Trang About).
	- exchange.css (style cho Trang Exchange).
	- roadmap.css (style cho Trang Roadmap).
	- ntf.css (style cho Trang NFT).
	- whitepaper.css (style cho Trang WhitePaper).
	

