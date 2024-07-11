import { MigrationInterface, QueryRunner } from "typeorm";

export class Two1720454438046 implements MigrationInterface {
    name = 'Two1720454438046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item_refunds\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`order_item_refunds\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_145532db85752b29c57d2b7b1f1\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`orderId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_9263386c35b6b242540f9493b00\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`productId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_9263386c35b6b242540f9493b00\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_145532db85752b29c57d2b7b1f1\``);
        await queryRunner.query(`DROP INDEX \`REL_145532db85752b29c57d2b7b1f\` ON \`order_items\``);
        await queryRunner.query(`ALTER TABLE \`order_item_refunds\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`order_item_refunds\` ADD \`created_at\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP INDEX \`IDX_145532db85752b29c57d2b7b1f\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`created_at\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`created_at\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`website_pageviews\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`website_pageviews\` ADD \`created_at\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`created_at\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`website_sessions\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`website_sessions\` ADD \`created_at\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`order_items\` DROP COLUMN \`orderItemId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`orderId\``);
        await queryRunner.query(`ALTER TABLE \`order_items\` ADD \`order_item_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`order_id\` int NULL`);
    }

}
