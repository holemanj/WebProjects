<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>
	<xsl:template match="/">
		<xsl:for-each select="BasicInfo/InherentQualities/InherentQuality">
			<xsl:variable name="attributeID">attr<xsl:number/></xsl:variable>
			<section class="attribute">
				<label>
					<xsl:attribute name="for"><xsl:value-of select="$attributeID"/></xsl:attribute>
					<xsl:attribute name="class">attributeName</xsl:attribute>
					<xsl:value-of select="name"/>
				</label>
				<input class="attributeScore">
					<xsl:attribute name="required"/>
					<xsl:attribute name="value"><xsl:value-of select="value"/></xsl:attribute>
					<xsl:attribute name="pattern">[0-9]{2}</xsl:attribute>
				</input>
				<div class="attributeBonus"></div>
			</section>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
