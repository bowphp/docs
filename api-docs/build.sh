# Ge the bow framework source
[ -d ./framework ] || git clone https://github.com/bowphp/framework ./framework

# Install the doctum if not exists
[ -f ./doctum.phar ] || curl -O https://doctum.long-term.support/releases/latest/doctum.phar

# Build the api docs base on define configuration
php doctum.phar update config.php 2>/dev/null || true
